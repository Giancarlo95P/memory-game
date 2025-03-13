gsap.to(".circle", {
  rotationY: 360,
  duration: 1,
  ease: "power2.inOut",
  repeat: 1,
});

gsap.to(".plus", {
  rotationX: 360,
  duration: 1.5,
  ease: "power2.inOut",
  repeat: 1,
  delay: 0.5,
});

gsap.to(".triangle", {
  rotationX: 360,
  duration: 1,
  ease: "power2.inOut",
  repeat: 1,
  delay: 1.0,
});

gsap.to(".go", {
  scale: 1.3,
  duration: 0.6,
  ease: "power2.inOut",
  yoyo: true,
  repeat: -1,
  delay: 2.0,
});
