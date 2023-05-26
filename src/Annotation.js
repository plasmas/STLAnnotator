class Annotation {
    constructor(id) {
        this.points = []
        this.id = id
        this.description = "Annotation " + id
        this.color = generateRandomColor();
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
