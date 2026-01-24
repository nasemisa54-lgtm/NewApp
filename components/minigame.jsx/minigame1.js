import Matter from 'matter-js';
import { useEffect, useRef, useState } from 'react';

const MiniGame = () => {
  const sceneRef = useRef(null);
  const engineRef = useRef(Matter.Engine.create());
  const [score, setScore] = useState({ sheep: 0, cow: 0 });

  useEffect(() => {
    const engine = engineRef.current;
    const { world } = engine;
    const render = Matter.Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width: 800,
        height: 400,
        wireframes: false,
        background: '#15803d', // green-700
      },
    });

    // 1. Create Boundaries (Floor is the "Belt")
    const ground = Matter.Bodies.rectangle(400, 390, 810, 60, {
      isStatic: true,
      render: { fillStyle: '#166534' }
    });

    // 2. Create the Players & Ball
    const sheep = Matter.Bodies.rectangle(200, 300, 40, 40, {
      restitution: 0.5,
      render: { sprite: { texture: 'https://placehold.co/40x40/white/black?text=🐑' } }
    });
    const cow = Matter.Bodies.rectangle(600, 300, 50, 50, {
      restitution: 0.5,
      render: { sprite: { texture: 'https://placehold.co/50x50/white/black?text=🐄' } }
    });
    const ball = Matter.Bodies.circle(400, 100, 15, {
      restitution: 0.8,
      friction: 0.005,
      render: { fillStyle: '#ffffff' }
    });

    Matter.World.add(world, [ground, sheep, cow, ball]);

    // 3. Game Loop (The "Belt" logic)
    Matter.Events.on(engine, 'beforeUpdate', () => {
      // Simulate the belt moving left
      const beltSpeed = -0.002;
      Matter.Body.applyForce(ball, ball.position, { x: beltSpeed, y: 0 });

      // Goal Detection
      if (ball.position.x < 20) {
        setScore(s => ({ ...s, cow: s.cow + 1 }));
        Matter.Body.setPosition(ball, { x: 400, y: 100 });
        Matter.Body.setVelocity(ball, { x: 0, y: 0 });
      }
      if (ball.position.x > 780) {
        setScore(s => ({ ...s, sheep: s.sheep + 1 }));
        Matter.Body.setPosition(ball, { x: 400, y: 100 });
        Matter.Body.setVelocity(ball, { x: 0, y: 0 });
      }
    });

    Matter.Runner.run(engine);
    Matter.Render.run(render);

    // Controls
    const handleKeyDown = (e) => {
      if (e.key === 'a') Matter.Body.applyForce(sheep, sheep.position, { x: 0, y: -0.05 });
      if (e.key === 'l') Matter.Body.applyForce(cow, cow.position, { x: 0, y: -0.07 });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      Matter.Render.stop(render);
      Matter.Engine.clear(engine);
      render.canvas.remove();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-500 p-4">
      <div className="mb-4 text-center">
        <h1 className="text-4xl font-black text-white italic drop-shadow-md">COW vs SHEEP</h1>
        <p className="text-2xl text-white font-mono">Sheep: {score.sheep} | Cow: {score.cow}</p>
      </div>

      <div ref={sceneRef} className="border-8 border-white rounded-xl shadow-2xl overflow-hidden" />

      <div className="mt-6 grid grid-cols-2 gap-10">
        <div className="text-center">
          <kbd className="px-4 py-2 bg-white rounded shadow-lg font-bold text-xl text-green-800">A</kbd>
          <p className="text-white mt-2 font-bold">SHEEP JUMP</p>
        </div>
        <div className="text-center">
          <kbd className="px-4 py-2 bg-white rounded shadow-lg font-bold text-xl text-green-800">L</kbd>
          <p className="text-white mt-2 font-bold">COW JUMP</p>
        </div>
      </div>
    </div>
  );
};

export default MiniGame;