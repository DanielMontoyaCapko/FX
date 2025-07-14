import videoBackground from "@/assets/Video Logo Fondo_1752489214378.mp4";

export default function VideoBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      <video 
        autoPlay 
        muted 
        playsInline
        preload="metadata"
        className="absolute inset-0 w-4/5 h-4/5 object-cover mx-auto my-auto"
        style={{ 
          filter: 'brightness(0.6)',
          transform: 'translate(10%, 10%)'
        }}
      >
        <source src={videoBackground} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-black/50"></div>
    </div>
  );
}