# React-three-fiber demo

## Setup

```sh
npm install
npm start
```

## How to use

1. Upload a ```.stl``` file through the upload button.
2. Adjust the view to centralize the surface you want to annotate.
3. Move your pointer to place where you want the highlight to start.
4. Press and hold the alt/option key. Move your pointer on the surface to draw a convex shape.
5. Release the option when the drawing completes.
6. Repeat process 4-5 to draw multiple shapes.
7. You can remove an annotation by clicking the "trash" button in the annotation list.

## Known Issues

1. Due to fan triangulation, only convex shapes can be drawn correctly rightnow.
2. The shape only looks good on a single surface. It may be clipped by crossing multiple surface.
