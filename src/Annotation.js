class Annotation {
    constructor(id) {
        // Vector3[] that makes up the shape drawn by the user
        this.points = []
        // id or key
        this.id = id
        this.description = "Annotation " + id
        this.color = generateRandomColor();
        // whether the user is done drawing the shape
        this.complete = false;
    }

    addPoint(point) {
        this.points.push(point);
    }
}

function generateRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

export default Annotation;
