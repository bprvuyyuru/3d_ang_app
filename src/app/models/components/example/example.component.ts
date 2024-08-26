import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import * as THREE from "three";

@Component({
  selector: "app-example",
  standalone: true,
  imports: [],
  templateUrl: "./example.component.html",
  styleUrls: ["./example.component.scss"],
})
export class ExampleComponent implements OnInit, AfterViewInit {
  @ViewChild("canvas")
  private canvasRef!: ElementRef;

  @Input() public rotationSpeedX: number = 0.05;
  @Input() public rotationSpeedY: number = 0.01;
  @Input() public size: number = 200;
  @Input() public texture: string = "/assets/texture.jpg";

  //* Stage Properties
  @Input() public cameraZ: number = 400;
  @Input() public fieldOfView: number = 4;
  @Input("nearClipping") public nearClippingPlane: number = 1;
  @Input("farClipping") public farClippingPlane: number = 500;

  //? Helper Properties (Private Properties)
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private cube!: THREE.Mesh;
  private cube2!: THREE.Mesh;

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.initializeScene();
    this.startRenderingLoop();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["cameraZ"] && !changes["cameraZ"].isFirstChange()) {
      // Update the camera's z position dynamically when cameraZ changes
      this.camera.position.z = this.cameraZ;
    }
    if (
      changes["rotationSpeedX"] &&
      !changes["rotationSpeedX"].isFirstChange()
    ) {
      // Update the speed dynamically when speedx changes
      this.cube.rotation.x += this.rotationSpeedX;
    }
    if (
      changes["rotationSpeedY"] &&
      !changes["rotationSpeedY"].isFirstChange()
    ) {
      // Update the speed dynamically when speedx changes
      this.cube.rotation.y += this.rotationSpeedY;
    }
    if (changes["texture"] && !changes["texture"].isFirstChange()) {
      this.updateTexture(this.texture);
    }
  }

  private updateTexture(texture: string) {
    const loader = new THREE.TextureLoader();
    loader.load(texture, (newTexture) => {
      (this.cube.material as THREE.MeshBasicMaterial).map = newTexture;
    });
  }

  /**
   * Initialize the scene, camera, and cube
   */
  private initializeScene() {
    // Load texture and create the material
    const loader = new THREE.TextureLoader();
    loader.load(this.texture, (texture) => {
      const geometry = new THREE.BoxGeometry(2, 2, 2);
      const geometry1 = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshBasicMaterial({ map: texture });
      this.cube = new THREE.Mesh(geometry, material);

      this.createScene();
    });
  }

  /**
   * Create the scene
   */
  private createScene() {
    //* Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xffffff);
    this.scene.add(this.cube);

    //* Camera
    const aspectRatio = this.getAspectRatio();
    this.camera = new THREE.PerspectiveCamera(
      this.fieldOfView,
      aspectRatio,
      this.nearClippingPlane,
      this.farClippingPlane
    );
    this.camera.position.z = this.cameraZ;
  }

  private getAspectRatio() {
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

  /**
   * Start the rendering loop
   */
  private startRenderingLoop() {
    //* Renderer
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);

    const component: ExampleComponent = this;
    (function render() {
      requestAnimationFrame(render);
      component.animateCube();
      component.renderer.render(component.scene, component.camera);
    })();
  }

  /**
   * Animate the cube
   */
  private animateCube() {
    if (this.cube) {
      this.cube.rotation.x += this.rotationSpeedX;
      this.cube.rotation.y += this.rotationSpeedY;
    }
  }
}
