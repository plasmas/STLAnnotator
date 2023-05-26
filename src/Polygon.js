import React from 'react';
import * as THREE from 'three';
import { MeshBasicMaterial } from 'three';

export default function Polygon({ points, color }) {
  // triangulate the points
  let triangles = [];
  for (let i = 0; i < points.length - 2; i++) {
    triangles.push(new THREE.Triangle(points[0], points[i + 1], points[i + 2]));
  }

  // define shared material
  const material = new MeshBasicMaterial({ color: color, opacity: 0.5, transparent: true, side: THREE.DoubleSide });

  // create mesh that contains all triangles
  var vertices = [];
  var indices = [];

  triangles.forEach((triangle) => {
    vertices.push(triangle.a.x, triangle.a.y, triangle.a.z);
    vertices.push(triangle.b.x, triangle.b.y, triangle.b.z);
    vertices.push(triangle.c.x, triangle.c.y, triangle.c.z);

    var startIndex = vertices.length / 3 - 3;
    indices.push(startIndex, startIndex + 1, startIndex + 2);
  });
  var geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setIndex(indices);
  return (
    <mesh geometry={geometry} material={material} />
  );
}