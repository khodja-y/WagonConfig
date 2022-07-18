import React, { useRef, useState, useEffect } from "react"
import { useGLTF } from "@react-three/drei"
import { proxy, useSnapshot } from "valtio"

const state = proxy({
  current: null,
  items: {
    Material009: "#ffffff",
    Material002: "#ffffff",
    Material003: "#ffffff",
    Material004: "#ffffff",
    Material005: "#ffffff",
    Material006: "#ffffff",
    Material007: "#ffffff",
    Material008: "#ffffff",
    Material001: "#ffffff",
  },
})

export default function Model({ ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF("/WagonWithoutTexture.glb")

  const snap = useSnapshot(state)
  // Animate model
  // useFrame((state) => {
  //   const t = state.clock.getElapsedTime()
  //   ref.current.rotation.z = -0.2 - (1 + Math.sin(t / 1.5)) / 20
  //   ref.current.rotation.x = Math.cos(t / 4) / 8
  //   ref.current.rotation.y = Math.sin(t / 4) / 8
  //   ref.current.position.y = (1 + Math.sin(t / 1.5)) / 10
  // })

  // Cursor showing current color
  const [hovered, set] = useState(null)
  useEffect(() => {
    const cursor = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><g filter="url(#filter0_d)"><path d="M29.5 47C39.165 47 47 39.165 47 29.5S39.165 12 29.5 12 12 19.835 12 29.5 19.835 47 29.5 47z" fill="${snap.items[hovered]}"/></g><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/><text fill="#000" style="white-space:pre" font-family="Inter var, sans-serif" font-size="10" letter-spacing="-.01em"><tspan x="35" y="63">${hovered}</tspan></text></g><defs><clipPath id="clip0"><path fill="#fff" d="M0 0h64v64H0z"/></clipPath><filter id="filter0_d" x="6" y="8" width="47" height="47" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy="2"/><feGaussianBlur stdDeviation="3"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow"/><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"/></filter></defs></svg>`
    const auto = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/></svg>`
    if (hovered) {
      document.body.style.cursor = `url('data:image/svg+xml;base64,${btoa(cursor)}'), auto`
      return () => (document.body.style.cursor = `url('data:image/svg+xml;base64,${btoa(auto)}'), auto`)
    }
  }, [hovered])

  console.log(materials)

  return (
    <group
      ref={group}
      {...props}
      dispose={null}
      onPointerOver={(e) => (e.stopPropagation(), set(e.object.material.name))}
      onPointerOut={(e) => e.intersections.length === 0 && set(null)}
      onPointerMissed={() => (state.current = null)}
      onClick={(e) => (e.stopPropagation(), (state.current = e.object.material.name))}>
      <group position={[1.74, 2.24, -0.35]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere.geometry}
          material={materials.Material009}
          material-color={snap.items.laces}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere_1.geometry}
          material={materials.Material002}
          material-color={snap.items.laces}
        />
        <mesh castShadow receiveShadow geometry={nodes.Sphere_2.geometry} material={materials["Material.003"]} />
        <mesh castShadow receiveShadow geometry={nodes.Sphere_3.geometry} material={materials["Material.001"]} />
        <mesh castShadow receiveShadow geometry={nodes.Sphere_4.geometry} material={materials["Material.006"]} />
        <mesh castShadow receiveShadow geometry={nodes.Sphere_5.geometry} material={materials["Material.005"]} />
        <mesh castShadow receiveShadow geometry={nodes.Sphere_6.geometry} material={materials["Material.004"]} />
        <mesh castShadow receiveShadow geometry={nodes.Sphere_7.geometry} material={materials["Material.007"]} />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Balls.geometry}
        material={materials["Material.008"]}
        position={[-0.43, 5.11, 0.03]}
        scale={0.11}
      />
    </group>
  )
}

useGLTF.preload("/WagonWithoutTexture.glb")
