import "./App.css";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import * as THREE from "three";
import { Suspense } from "react";
import { useState } from "react";
import Controls from "./Controls";
import Polygon from "./Polygon";
import { Grid, Paper, Button } from "@mui/material"
import List from '@mui/material/List';
import Annotation from "./Annotation";
import HighlightItem from "./HighlightItem";
import Model from "./Model";


export default function App() {
  // the model loaded
  const [model, setModel] = useState(null);
  // list of annotations
  const [annotations, setAnnotations] = useState([]);

  // handle STL file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        loadModel(data);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  // process uploaded STL file
  const loadModel = (data) => {
    const loader = new STLLoader();
    const geometry = loader.parse(data);
    geometry.center();
    const material = new THREE.MeshStandardMaterial({ color: '#6b6b6b' });
    const mesh = new THREE.Mesh(geometry, material);
    setModel(mesh);
  };

  // add point to annotation if condition is met
  // triggered when mouse pointer is over the model
  const addPoint = (point, altKey) => {
    if (!altKey) {
      // alt key not pressed
      if (annotations.length > 0 && !annotations[annotations.length - 1].complete) {
        // last annotation not yet complete
        const lastAnnotation = annotations[annotations.length - 1];
        lastAnnotation.complete = true;
        setAnnotations([...annotations.slice(0, annotations.length - 1), lastAnnotation]);
        return;
      } else {
        // last complete, nothing to do
        return;
      }
    } else {
      // alt pressed
      if (annotations.length > 0 && !annotations[annotations.length - 1].complete) {
        // last not complete
        const lastAnnotation = annotations[annotations.length - 1];
        // appending point to last annotation
        lastAnnotation.addPoint(point);
        setAnnotations([...annotations.slice(0, annotations.length - 1), lastAnnotation]);
        return;
      } else {
        // last complete
        const id = Math.max(...annotations.map((annotation) => annotation.id), 0) + 1;
        // generate new annotation
        const newAnnotation = new Annotation(id);
        newAnnotation.addPoint(point);
        setAnnotations([...annotations, newAnnotation]);
        return;
      }
    }
  }

  // handles deletion action on an annotation
  const handleDelete = (annotationId) => {
    setAnnotations(annotations.filter((annotation) => annotation.id !== annotationId));
  }

  return (
    <div className="App">
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Paper style={{ height: '600px' }} elevation={3}>
            <Canvas>
              <Suspense fallback={null}>
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                {
                  model && <Model model={model} addPoint={addPoint} />
                }
                {
                  annotations.map((annotation) => {
                    return <Polygon key={annotation.id} points={annotation.points} color={annotation.color} />
                  })
                }
                <Environment preset="sunset" background />
                <Controls />
              </Suspense>
            </Canvas>
          </Paper>
        </Grid>
        <Grid item xs={4} container direction="column" spacing={2}>
          <Grid item justifyContent={'center'}>
            <Button
              variant="contained"
              component="label"
            >
              Upload File
              <input
                type="file"
                accept=".stl"
                onChange={handleFileUpload}
                hidden
              />
            </Button>
          </Grid>
          <Grid item>
            <Paper style={{ height: '300px' }} elevation={3} >
              <List>
                {
                  annotations.map((annotation) => {
                    return <HighlightItem key={annotation.id} annotation={annotation} handleDelete={handleDelete} />
                  })
                }
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
