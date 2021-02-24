let camera, scene, renderer;
let controls;
let imgx;
window.onload = () => {
    init();
    animate();
};

function init() {
    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 3000;

    scene = new THREE.Scene();


    objectData.forEach((cardItem, cardIndex) => {
        //竖直背景
        const dv1 = document.createElement('div');
        dv1.style.width = '3000px';// cardItem.verticalBg.width + 'px';
        dv1.style.height = '700px';
        dv1.style.background = '#f3f3f3 url(' + cardItem.verticalBg.url + ') ';
        dv1.style.textAlign = 'center';
        var txt = document.getElementById('idtable');
        txt.style.transformOrigin = 'center top';
        dv1.appendChild(txt);



        const vv = new THREE.CSS3DObject(dv1);
        scene.add(vv);

        // 地面
        const dv2 = document.createElement('div');
        dv2.style.width = '3000px';
        dv2.style.height = '700px';
        dv2.style.transformOrigin = 'center top';
        dv2.style.background = ' url(' + cardItem.ground.url + ')   ';
        const g_obj = new THREE.CSS3DObject(dv2);
        g_obj.rotation.x = cardItem.ground.rotation;
        scene.add(g_obj);

        // 元素
        cardItem.things.forEach((item, index) => {
            const thing = document.createElement('div');
            thing.style.width = item.width + 'px';
            thing.style.height = item.height + 'px';
            thing.style.background = 'url(' + item.url + ') no-repeat';
            const objectThing = new THREE.CSS3DObject(thing);
            objectThing.rotation.x = cardItem.thingsRotation;
            objectThing.position.y = -(index + 6) * 68;
            objectThing.position.x = item.x;
            objectThing.position.z = -item.y - 300;
            g_obj.add(objectThing);
        });
    });

    renderer = new THREE.CSS3DRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('container').appendChild(renderer.domElement);

    controls = new THREE.TrackballControls(camera, renderer.domElement);
    controls.addEventListener('change', render);

    window.addEventListener('resize', onWindowResize, false);

    render();
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    render();
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
}

function render() {
    renderer.render(scene, camera);
}
