/**
 * Code is heavily based on source from
 * https://github.com/spacejack/carphysics2d
 */

import { Vec2 } from '../../../../utils/math/Vec2';
import { GMath } from '../../../../utils/math/GMath';

const getInputState = () => ({
    left: 0,
    right: 0,
    throttle: 0,
    brake: 0,
    ebrake: 0
});

/**
 *  Car setup params and magic constants.
 */
export const getCarConfig = (opts = {}) => {
    const state = {};

    //  Defaults approximate a lightweight sports-sedan.
    state.gravity = opts.gravity || 9.81; // m/s^2
    state.mass = opts.mass || 1200.0; // kg
    state.inertiaScale = opts.inertiaScale || 1.0; // Multiply by mass for inertia
    state.halfWidth = opts.halfWidth || 0.8; // Centre to side of chassis (metres)
    state.cgToFront = opts.cgToFront || 2.0; // Centre of gravity to front of chassis (metres)
    state.cgToRear = opts.cgToRear || 2.0; // Centre of gravity to rear of chassis
    state.cgToFrontAxle = opts.cgToFrontAxle || 1.25; // Centre gravity to front axle
    state.cgToRearAxle = opts.cgToRearAxle || 1.25; // Centre gravity to rear axle
    state.cgHeight = opts.cgHeight || 0.55; // Centre gravity height
    state.wheelRadius = opts.wheelRadius || 0.3; // Includes tire (also represents height of axle)
    state.wheelWidth = opts.wheelWidth || 0.2; // Used for render only
    state.tireGrip = opts.tireGrip || 2.0; // How much grip tires have
    state.lockGrip =
        typeof opts.lockGrip === 'number'
            ? GMath.clamp(opts.lockGrip, 0.01, 1.0)
            : 0.7; // % of grip available when wheel is locked
    state.engineForce = opts.engineForce || 8000.0;
    state.brakeForce = opts.brakeForce || 4000.0;
    state.eBrakeForce = opts.eBrakeForce || state.brakeForce / 2.5;
    state.weightTransfer =
        typeof opts.weightTransfer === 'number' ? opts.weightTransfer : 0.2; // How much weight is transferred during acceleration/braking
    state.maxSteer = opts.maxSteer || 0.6; // Maximum steering angle in radians
    state.cornerStiffnessFront = opts.cornerStiffnessFront || 5.0;
    state.cornerStiffnessRear = opts.cornerStiffnessRear || 5.2;
    state.airResist = typeof opts.airResist === 'number' ? opts.airResist : 2.5; // air resistance (* vel)
    state.rollResist =
        typeof opts.rollResist === 'number' ? opts.rollResist : 8.0; // rolling resistance force (* vel)

    return state;
};

function Car(opts = {}, scale) {
    //  State of inputs
    this.inputs = getInputState();

    //  Car state variables
    this.heading = opts.heading || 0.0; // angle car is pointed at (radians)
    this.position = new Vec2(opts.x, opts.y); // metres in world coords
    this.velocity = new Vec2(); // m/s in world coords
    this.velocity_c = new Vec2(); // m/s in local car coords (x is forward y is sideways)
    this.accel = new Vec2(); // acceleration in world coords
    this.accel_c = new Vec2(); // acceleration in local car coords
    this.absVel = 0.0; // absolute velocity m/s
    this.yawRate = 0.0; // angular velocity in radians
    this.steer = 0.0; // amount of steering input (-1.0..1.0)
    this.steerAngle = 0.0; // actual front wheel steer angle (-maxSteer..maxSteer)

    //  Use input smoothing (on by default)
    this.smoothSteer =
        opts.smoothSteer === undefined ? true : !!opts.smoothSteer;
    //  Use safe steering (angle limited by speed)
    this.safeSteer = opts.safeSteer === undefined ? true : !!opts.safeSteer;

    //  Setup car configuration
    this.config = getCarConfig(opts.config);

    // Re-calculate these
    this.inertia = this.config.mass * this.config.inertiaScale;
    this.wheelBase = this.config.cgToFrontAxle + this.config.cgToRearAxle;
    this.axleWeightRatioFront = this.config.cgToRearAxle / this.wheelBase; // % car weight on the front axle
    this.axleWeightRatioRear = this.config.cgToFrontAxle / this.wheelBase; // % car weight on the rear axle
}

/**
 *  @param dt Floating-point Delta Time in seconds
 */
Car.prototype.doPhysics = function(dt, dtHeading) {
    // Shorthand
    let cfg = this.config;

    // Pre-calc heading vector
    let sn = Math.sin(this.heading);
    let cs = Math.cos(this.heading);

    // Get velocity in local car coordinates
    this.velocity_c.x = cs * this.velocity.x + sn * this.velocity.y;
    this.velocity_c.y = cs * this.velocity.y - sn * this.velocity.x;

    // Weight on axles based on centre of gravity and weight shift due to forward/reverse acceleration
    let axleWeightFront =
        cfg.mass *
        (this.axleWeightRatioFront * cfg.gravity -
            cfg.weightTransfer *
                this.accel_c.x *
                cfg.cgHeight /
                this.wheelBase);
    let axleWeightRear =
        cfg.mass *
        (this.axleWeightRatioRear * cfg.gravity +
            cfg.weightTransfer *
                this.accel_c.x *
                cfg.cgHeight /
                this.wheelBase);

    // Resulting velocity of the wheels as result of the yaw rate of the car body.
    // v = yawrate * r where r is distance from axle to CG and yawRate (angular velocity) in rad/s.
    let yawSpeedFront = cfg.cgToFrontAxle * this.yawRate;
    let yawSpeedRear = -cfg.cgToRearAxle * this.yawRate;

    // Calculate slip angles for front and rear wheels (a.k.a. alpha)
    let slipAngleFront =
        Math.atan2(
            this.velocity_c.y + yawSpeedFront,
            Math.abs(this.velocity_c.x)
        ) -
        GMath.sign(this.velocity_c.x) * this.steerAngle;
    let slipAngleRear = Math.atan2(
        this.velocity_c.y + yawSpeedRear,
        Math.abs(this.velocity_c.x)
    );

    let tireGripFront = cfg.tireGrip;
    let tireGripRear =
        cfg.tireGrip * (1.0 - this.inputs.ebrake * (1.0 - cfg.lockGrip)); // reduce rear grip when ebrake is on

    let frictionForceFront_cy =
        GMath.clamp(
            -cfg.cornerStiffnessFront * slipAngleFront,
            -tireGripFront,
            tireGripFront
        ) * axleWeightFront;
    let frictionForceRear_cy =
        GMath.clamp(
            -cfg.cornerStiffnessRear * slipAngleRear,
            -tireGripRear,
            tireGripRear
        ) * axleWeightRear;

    //  Get amount of brake/throttle from our inputs
    let brake = Math.min(
        this.inputs.brake * cfg.brakeForce +
            this.inputs.ebrake * cfg.eBrakeForce,
        cfg.brakeForce
    );
    let throttle = this.inputs.throttle * cfg.engineForce;

    //  Resulting force in local car coordinates.
    //  This is implemented as a RWD car only.
    let tractionForce_cx = throttle - brake * GMath.sign(this.velocity_c.x);
    let tractionForce_cy = 0;

    let dragForce_cx =
        -cfg.rollResist * this.velocity_c.x -
        cfg.airResist * this.velocity_c.x * Math.abs(this.velocity_c.x);
    let dragForce_cy =
        -cfg.rollResist * this.velocity_c.y -
        cfg.airResist * this.velocity_c.y * Math.abs(this.velocity_c.y);

    // total force in car coordinates
    let totalForce_cx = dragForce_cx + tractionForce_cx;
    let totalForce_cy =
        dragForce_cy +
        tractionForce_cy +
        Math.cos(this.steerAngle) * frictionForceFront_cy +
        frictionForceRear_cy;

    // acceleration along car axes
    this.accel_c.x = totalForce_cx / cfg.mass; // forward/reverse accel
    this.accel_c.y = totalForce_cy / cfg.mass; // sideways accel

    // acceleration in world coordinates
    this.accel.x = cs * this.accel_c.x - sn * this.accel_c.y;
    this.accel.y = sn * this.accel_c.x + cs * this.accel_c.y;

    // update velocity
    this.velocity.x += this.accel.x * dt;
    this.velocity.y += this.accel.y * dt;

    this.absVel = this.velocity.len();

    // calculate rotational forces
    let angularTorque =
        (frictionForceFront_cy + tractionForce_cy) * cfg.cgToFrontAxle -
        frictionForceRear_cy * cfg.cgToRearAxle;

    //  Sim gets unstable at very slow speeds, so just stop the car
    if (Math.abs(this.absVel) < 0.5 && !throttle) {
        this.velocity.x = this.velocity.y = this.absVel = 0;
        angularTorque = this.yawRate = 0;
    }

    let angularAccel = angularTorque / this.inertia;

    this.yawRate += angularAccel * dtHeading;
    this.heading += this.yawRate * dtHeading;

    //  finally we can update position
    this.position.x += this.velocity.x * dt;
    this.position.y += this.velocity.y * dt;
};

/**
 *  Smooth Steering
 *  Apply maximum steering angle change velocity.
 */
Car.prototype.applySmoothSteer = function(steerInput, dt) {
    let steer = 0;

    if (Math.abs(steerInput) > 0.001) {
        //  Move toward steering input
        steer = GMath.clamp(this.steer + steerInput * dt * 2.0, -1.0, 1.0); // -inp.right, inp.left);
    } else {
        //  No steer input - move toward centre (0)
        if (this.steer > 0) {
            steer = Math.max(this.steer - dt * 1.0, 0);
        } else if (this.steer < 0) {
            steer = Math.min(this.steer + dt * 1.0, 0);
        }
    }

    return steer;
};

/**
 *  Safe Steering
 *  Limit the steering angle by the speed of the car.
 *  Prevents oversteer at expense of more understeer.
 */
Car.prototype.applySafeSteer = function(steerInput) {
    let avel = Math.min(this.absVel, 250.0); // m/s
    return steerInput * (1.0 - avel / 280.0);
};

/**
 *  @param dtms Delta Time in milliseconds
 */
Car.prototype.update = function(dtms, m, h) {
    let dt = m * dtms / 1000.0; // delta T in seconds
    let dtHeading = h * dtms / 1000.0; // delta T in seconds

    this.throttle = this.inputs.throttle;
    this.brake = this.inputs.brake;

    let steerInput = this.inputs.left - this.inputs.right;

    //  Perform filtering on steering...
    if (this.smoothSteer)
        this.steer = this.applySmoothSteer(steerInput, dtHeading);
    else this.steer = steerInput;

    if (this.safeSteer) this.steer = this.applySafeSteer(this.steer);

    //  Now set the actual steering angle
    this.steerAngle = this.steer * this.config.maxSteer;

    //
    //  Now that the inputs have been filtered and we have our throttle,
    //  brake and steering values, perform the car physics update...
    //
    this.doPhysics(dt, dtHeading);
};

Car.prototype.setInput = function(inputs = {}) {
    this.inputs = { ...this.inputs, ...inputs };
};

export const createCarPhysics = (opts, scale) => new Car(opts, scale);
