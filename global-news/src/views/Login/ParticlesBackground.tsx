import { useCallback } from "react";
import type { Container, Engine } from "tsparticles-engine";
import Particles from "react-particles";
import { loadFull } from "tsparticles";

const ParticlesBackground = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    // console.log(engine);

    // you can initialize the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    // await console.log(container);
  }, []);
  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        preset: 'basic',
        //  TODO: 示例的配置，粒子会越来越快，性能损耗，而官网demo配置导出报错，暂时使用基础preset。
        // background: {
        //   color: {
        //     value: "#0d47a1",
        //   },
        // },
        // fpsLimit: 120,
        // interactivity: {
        //   events: {
        //     onClick: {
        //       enable: true,
        //       mode: "push",
        //     },
        //     onHover: {
        //       enable: true,
        //       mode: "repulse",
        //     },
        //     resize: true,
        //   },
        //   modes: {
        //     push: {
        //       quantity: 4,
        //     },
        //     repulse: {
        //       distance: 200,
        //       duration: 0.4,
        //     },
        //   },
        // },
        // particles: {
        //   color: {
        //     value: "#ffffff",
        //   },
        //   links: {
        //     color: "#ffffff",
        //     distance: 150,
        //     enable: true,
        //     opacity: 0.5,
        //     width: 1,
        //   },
        //   collisions: {
        //     enable: true,
        //   },
        //   move: {
        //     direction: "none",
        //     enable: true,
        //     outModes: {
        //       default: "bounce",
        //     },
        //     random: false,
        //     speed: 6,
        //     straight: false,
        //   },
        //   number: {
        //     density: {
        //       enable: true,
        //       area: 800,
        //     },
        //     value: 80,
        //   },
        //   opacity: {
        //     value: 0.5,
        //   },
        //   shape: {
        //     type: "circle",
        //   },
        //   size: {
        //     value: { min: 1, max: 5 },
        //   },
        // },
        // detectRetina: true,
      }}
    />
  );
};

export default ParticlesBackground