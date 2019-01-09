
            //.setViewport (width: 50, height: 50);
            var scene = new THREE.Scene( );
            var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            
            var renderer = new THREE.WebGLRenderer( );
            renderer.setSize(window.innerWidth, window.innerHeight);
            document.body.appendChild(renderer.domElement);
            
            //responsive viewport
            window.addEventListener('resize', function()
            {
                var width = window.innerWidth ;
                var height = window.innerHeight;
                //window.innerHeight
                renderer.setSize(width, height);
                camera.aspect = width / height;
                camera.updateProjectionMatrix();
            } )
            
            controls = new THREE.OrbitControls(camera, renderer.domElement);
            
            var loader = new THREE.OBJLoader();
            
            loader.load 
            (
                'models/obj/1.OBJ',
                
                function(object)
                {
                    var objectMaterial = new THREE.MeshPhongMaterial ({color:0xffffff});
                    scene.add(object);
                    object.position.z = 5;
                    object.position.y = -1.3;
                }
            );
            
            
            //create shape
            var geometry = new THREE.BoxGeometry(2,2,2);
            var cubeMaterials =
                [
                    new THREE.MeshPhongMaterial ( {map: new THREE.TextureLoader().load('img/1.jpg'), side: THREE.FrontSide} ), //RIGHT 
                    new THREE.MeshLambertMaterial ( {map: new THREE.TextureLoader().load('img/1.jpg'), side: THREE.FrontSide} ), //LEFT
                    new THREE.MeshPhongMaterial ( {map: new THREE.TextureLoader().load('img/1.jpg'), side: THREE.FrontSide} ), //TOP
                    new THREE.MeshPhongMaterial ( {map: new THREE.TextureLoader().load('img/1.jpg'), side: THREE.FrontSide} ) , //BOTTOM
                    new THREE.MeshBasicMaterial ( {map: new THREE.TextureLoader().load('img/1.jpg'), side: THREE.FrontSide} ), //FRONT
                    new THREE.MeshBasicMaterial ( {map: new THREE.TextureLoader().load('img/1.jpg'), side: THREE.FrontSide} ) //BACK
                ];
            
            //material, color or image texture
            var material = new THREE.MeshFaceMaterial (cubeMaterials);
            var cube = new THREE.Mesh(geometry, material);
            //scene.add(cube);

            //camera position
            camera.position.z = 3;
            //camera.position.y = 1.2;
            

            
            //floor
            var FloorGeometry = new THREE.CubeGeometry(10,0.1,10);
            var FloorMaterial = new THREE.MeshPhongMaterial ({color:  0x7a7a7a, side: THREE.DoubleSide});
            var FloorCube = new THREE.Mesh (FloorGeometry, FloorMaterial);
            FloorCube.position.y = -5;
            //scene.add (FloorCube);
            
            //wall
            var wallGeometry = new THREE.CubeGeometry (0.1, 10, 10);
            var wallMaterial = new THREE.MeshPhongMaterial({color: 0x7a7a7a, side: THREE.DoubleSide});
            var wallObject = new THREE.Mesh (wallGeometry, wallMaterial);
            wallObject.position.x = -5;
            //scene.add(wallObject);
            
            var ambientLight = new THREE.AmbientLight(  0xFFFFFF, 0.8);
            //scene.add(ambientLight);
            
            var light1 = new THREE.PointLight( 0xffffff, 1, 30);
            light1.position.set (0,10,8);
            scene.add(light1);
            
            var light2 = new THREE.PointLight( 0x0f296f, 2, 50);
            //scene.add(light2);
            
            var light3 = new THREE.PointLight( 0x12ff96, 3, 50);
            //scene.add(light3);
            
            //movig lamp cube :)
            var lampGeometry = new THREE.CubeGeometry ();
            var lampMaterial = new THREE.MeshLambertMaterial ({color:0xFFFFFF, side: THREE.DoubleSide});
            var lampObject = new THREE.Mesh (lampGeometry, lampMaterial);
            //scene.add(lampObject);
            
            var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
            directionalLight.position.set(0,1,0);
            //scene.add(directionalLight);
            
            var spotLight = new THREE.SpotLight(0xffffff, 25 );
            spotLight.position.set( 0,3,0);
            //scene.add(spotLight);
            
            
            //logic
            var update = function()
            {
                //cube.rotation.x += 0.01;
                //cube.rotation.y += 0.005;
                
                var time = Date.now() * 0.0005;
                
                //light1.position.x = Math.sin(time * 0.7) * 30;
                //light1.position.y = Math.cos(time * 0.5) * 40;
                //light1.position.z = Math.cos(time * 0.3) * 30;
                
                light2.position.x = Math.cos(time * 0.8) * 30;
                light2.position.y = Math.sin(time * 0.6) * 40;
                light2.position.z = Math.sin(time * 0.2) * 30;
                
                light3.position.x = Math.sin(time * 0.5) * 30;
                light3.position.y = Math.cos(time * 0.3) * 40;
                light3.position.z = Math.sin(time * 0.4) * 30;
                
                //lamp
                lampObject.position.x = Math.sin(time * 0.7) * 30;
                lampObject.position.y = Math.cos(time * 0.5) * 40;
                lampObject.position.z = Math.cos(time * 0.3) * 30;
                
                
            };
            
            //draw scene
            var render = function()
            {
                renderer.render(scene, camera );
            };
            //update, render, repeat
            var GameLoop = function()
            {
                requestAnimationFrame(GameLoop);
                
                update();
                render();
            };
            
            GameLoop();