function Model({ model, addPoint }) {
    return <mesh
        geometry={model.geometry}
        material={model.material}
        onPointerMove={(e) => {
            const direction = e.ray.direction.normalize();
            const intersect = e.intersections[0].point;
            // the intersect point, slightly above the surface
            const point = intersect.add(direction.negate().setLength(0.1));
            addPoint(point, e.altKey);
        }}
    />;
}

export default Model;
