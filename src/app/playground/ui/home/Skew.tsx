import { useRef } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(Draggable);

const DraggableTiltCard = () => {
  const cardRef = useRef(null);
  const zoneRef = useRef(null);

  useGSAP(() => {
    if (!cardRef.current || !zoneRef.current) return;

    const card = cardRef.current;
    const zone = zoneRef.current;
    const lastPos = { x: 0, y: 0, time: Date.now() };

    const getCenterPosition = () => {
      const zoneRect = zone.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();

      const offsetX =
        zoneRect.left +
        zoneRect.width / 2 -
        (cardRect.left + cardRect.width / 2);
      const offsetY =
        zoneRect.top +
        zoneRect.height / 2 -
        (cardRect.top + cardRect.height / 2);

      return { offsetX, offsetY };
    };

    const isInsideZone = () => {
      const cardRect = card.getBoundingClientRect();
      const zoneRect = zone.getBoundingClientRect();

      return (
        cardRect.left > zoneRect.left &&
        cardRect.right < zoneRect.right &&
        cardRect.top > zoneRect.top &&
        cardRect.bottom < zoneRect.bottom
      );
    };

    const draggable = Draggable.create(card, {
      type: "x,y",
      onDrag: function () {
        const now = Date.now();
        const deltaTime = now - lastPos.time || 16;
        const dx = this.x - lastPos.x;
        const dy = this.y - lastPos.y;

        const velocityX = (dx / deltaTime) * 16;
        const velocityY = (dy / deltaTime) * 16;

        const rotateY = gsap.utils.clamp(-15, 15, velocityX);
        const rotateX = gsap.utils.clamp(-15, 15, -velocityY);

        gsap.to(card, {
          rotateX,
          rotateY,
          duration: 0.2,
          ease: "power2.out",
        });

        lastPos.x = this.x;
        lastPos.y = this.y;
        lastPos.time = now;
      },
      onRelease: function () {
        if (isInsideZone()) {
          const { offsetX, offsetY } = getCenterPosition();

          gsap.to(card, {
            x: `+=${offsetX}`,
            y: `+=${offsetY}`,
            rotateX: 0,
            rotateY: 0,
            duration: 0.6,
            ease: "power3.out",
          });
        } else {
          gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.6,
            ease: "elastic.out(1, 0.5)",
          });
        }
      },
    });

    return () => {
      draggable[0].kill();
    };
  }, []);

  return (
    <div className="wrapper">
      <div className="dropzone" ref={zoneRef}></div>
      <div className="card" ref={cardRef}>
        <h2>Drag Me</h2>
      </div>
      <style jsx>{`
        .wrapper {
          perspective: 1000px;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background: #f1f2f6;
        }
        .dropzone {
          position: relative;
          width: 500px;
          height: 400px;
          background: #b2bec3;
          border-radius: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);
        }

        .card {
          width: 200px;
          height: 150px;
          background: linear-gradient(135deg, #00b894, #00cec9);
          color: white;
          border-radius: 16px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          display: flex;
          justify-content: center;
          align-items: center;
          user-select: none;
          cursor: grab;
          transform-style: preserve-3d;
          position: absolute;
        }
      `}</style>
    </div>
  );
};

export default DraggableTiltCard;
