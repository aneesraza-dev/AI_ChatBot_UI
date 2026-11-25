import * as THREE from 'three';



const container = document.getElementById('canvas-container');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x9bd4ff);
scene.fog = new THREE.Fog(0x9bd4ff, 22, 55);

const camera = new THREE.PerspectiveCamera(58, container.clientWidth / container.clientHeight, 0.1, 80);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
container.appendChild(renderer.domElement);

scene.add(new THREE.AmbientLight(0xffffff, 0.9));
const sunLight = new THREE.DirectionalLight(0xfff6e0, 1.5);
sunLight.position.set(8, 16, 14);
scene.add(sunLight);

const insideLight1 = new THREE.PointLight(0xfff3b0, 3.5, 13);
insideLight1.position.set(0, 5.2, -2.5);
scene.add(insideLight1);

const insideLight2 = new THREE.PointLight(0xffffff, 2.4, 13);
insideLight2.position.set(0, 5.2, -5.5);
scene.add(insideLight2);

const stairLight = new THREE.PointLight(0xffeaa7, 1.8, 8);
stairLight.position.set(0, 4.4, 4.5);
scene.add(stairLight);




function makeTex(w, h, drawFn) {
    const c = document.createElement('canvas');
    c.width = w; c.height = h;
    drawFn(c.getContext('2d'), w, h);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
}

const greenMetalTex = makeTex(256, 256, (ctx, w, h) => {
    for (let x = 0; x < w; x += 16) {
        ctx.fillStyle = (x / 16) % 2 === 0 ? '#1aa34a' : '#138239';
        ctx.fillRect(x, 0, 16, h);
    }
});
greenMetalTex.wrapS = THREE.RepeatWrapping;
greenMetalTex.repeat.set(4, 1);

const broadwaySignTex = makeTex(1024, 512, (ctx, w, h) => {
    ctx.fillStyle = '#148f3f'; ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#ffffff'; ctx.strokeStyle = '#1f2937'; ctx.lineWidth = 18;
    ctx.fillRect(40, 60, w - 80, 230); ctx.strokeRect(40, 60, w - 80, 230);
    ctx.fillStyle = '#1f2937'; ctx.font = '900 148px Impact, Arial Black, sans-serif';
    ctx.textAlign = 'center'; ctx.fillText('BROADWAY', w / 2, 230);
    ctx.fillStyle = '#ffd500'; ctx.fillRect(260, 295, 420, 150); ctx.strokeRect(260, 295, 420, 150);
    ctx.fillStyle = '#1f2937'; ctx.font = '800 110px Arial, sans-serif';
    ctx.fillText('PIZZA', 470, 410);
});

const bwWebTex = makeTex(512, 128, (ctx, w, h) => {
    ctx.fillStyle = '#148f3f'; ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#ffd500'; ctx.fillRect(10, 10, w - 20, h - 20);
    ctx.fillStyle = '#ffffff'; ctx.fillRect(20, 42, w - 40, 66);
    ctx.fillStyle = '#111827'; ctx.font = 'bold 34px Arial'; ctx.textAlign = 'center';
    ctx.fillText('broadwaypizza.com.pk', w / 2, 88);
});

const aptechWallSignTex = makeTex(512, 512, (ctx) => {
    ctx.fillStyle = '#facc15'; ctx.fillRect(0, 0, 512, 512);
    ctx.fillStyle = '#ffffff'; ctx.fillRect(70, 120, 370, 130);
    ctx.strokeStyle = '#111'; ctx.lineWidth = 8; ctx.strokeRect(70, 120, 370, 130);
    ctx.fillStyle = '#111'; ctx.font = '900 54px Arial'; ctx.textAlign = 'center';
    ctx.fillText('Aptech', 210, 180); ctx.font = 'bold 30px Arial'; ctx.fillText('LEARNING', 255, 228);
    ctx.font = '900 34px Arial'; ctx.fillText('KORANGI CENTER', 256, 325);
});

const entranceSignTex = makeTex(512, 200, (ctx) => {
    ctx.fillStyle = '#facc15'; ctx.fillRect(0, 0, 512, 200);
    ctx.fillStyle = '#1f2937'; ctx.fillRect(90, 15, 332, 75);
    ctx.fillStyle = '#facc15'; ctx.font = 'bold 34px Arial'; ctx.textAlign = 'center';
    ctx.fillText('Aptech LEARNING', 256, 64);
    ctx.fillStyle = '#111827'; ctx.font = '900 56px Arial'; ctx.fillText('ENTRANCE', 256, 165);
});

const topDoorBannerTex = makeTex(1024, 220, (ctx, w) => {
    ctx.fillStyle = '#18181b'; ctx.fillRect(0, 0, w, 145);
    ctx.fillStyle = '#facc15'; ctx.fillRect(0, 145, w, 75);
    ctx.textAlign = 'center'; ctx.fillStyle = '#facc15'; ctx.font = '900 84px Arial';
    ctx.fillText('Aptech', 290, 98);
    ctx.fillStyle = '#ffffff'; ctx.font = '700 60px Arial'; ctx.fillText('LEARNING', 680, 98);
    ctx.fillStyle = '#111827'; ctx.font = 'italic bold 42px Arial';
    ctx.fillText('Unleash your potential', 340, 198);
});

// const rightPanelTex = makeTex(512, 900, (ctx) => {
//     ctx.fillStyle = '#fde047'; ctx.fillRect(0, 0, 512, 900);
//     ctx.fillStyle = '#ffffff'; ctx.fillRect(90, 110, 332, 75);
//     ctx.fillStyle = '#111'; ctx.font = '900 34px Arial'; ctx.textAlign = 'center';
//     ctx.fillText('Aptech LEARNING', 256, 158);
//     ctx.fillStyle = '#1f2937'; ctx.font = 'bold 28px Arial';
//     ctx.fillText('TAKE YOUR FIRST STEP TOWARDS', 256, 250);
//     ctx.fillText('A SUCCESSFUL CAREER IN I.T.', 256, 290);
//     ctx.fillStyle = '#fb7185';
//     ctx.beginPath(); ctx.arc(256, 700, 165, Math.PI, 0); ctx.fill();
//     ctx.fillRect(91, 700, 330, 200);
//     ctx.fillStyle = '#64748b'; ctx.fillRect(140, 620, 35, 280); ctx.fillRect(337, 620, 35, 280);
//     ctx.fillStyle = '#fed7aa'; ctx.beginPath(); ctx.arc(256, 465, 88, 0, Math.PI * 2); ctx.fill();
//     ctx.fillStyle = '#1e293b'; ctx.beginPath(); ctx.arc(256, 425, 92, Math.PI, 0); ctx.fill();
// });
const rightPanelTex = makeTex(512, 900, (ctx) => {
    ctx.fillStyle = '#facc15';
    ctx.fillRect(0, 0, 512, 900);

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(90, 110, 332, 75);

    ctx.fillStyle = '#111';
    ctx.font = '900 34px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Aptech KORANGI', 256, 158);

    ctx.fillStyle = '#1f2937';
    ctx.font = 'bold 28px Arial';
    ctx.fillText('TAKE YOUR FIRST STEP TOWARDS', 256, 250);
    ctx.fillText('A SUCCESSFUL CAREER IN I.T.', 256, 290);

    // Online Person Image
    const personImg = new Image();
    personImg.crossOrigin = 'anonymous';

    personImg.onload = () => {
        ctx.drawImage(personImg, 91, 330, 330, 570);
        rightPanelTex.needsUpdate = true;
    };

    personImg.onerror = () => {
        console.error('Person image failed to load');
    };

    personImg.src = '../assets/person.png   ';
});




const road = new THREE.Mesh(
    new THREE.PlaneGeometry(36, 16),
    new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.9 })
);
road.rotation.x = -Math.PI / 2;
road.position.set(2, -0.02, 16);
scene.add(road);

const sidewalk = new THREE.Mesh(
    new THREE.BoxGeometry(24, 0.16, 4.5),
    new THREE.MeshStandardMaterial({ color: 0xcbd5e1, roughness: 0.85 })
);
sidewalk.position.set(2, 0.08, 10.2);
scene.add(sidewalk);




const blockWall = new THREE.Mesh(new THREE.BoxGeometry(4, 3.6, 0.4), new THREE.MeshStandardMaterial({ color: 0xd1d5db }));
blockWall.position.set(-6.1, 1.8, 8.2);
const aptechOuterWall = new THREE.Mesh(new THREE.BoxGeometry(2.6, 3.8, 0.4), new THREE.MeshStandardMaterial({ color: 0xfacc15 }));
aptechOuterWall.position.set(-2.9, 1.9, 8.2);
const aptechWallSign = new THREE.Mesh(new THREE.PlaneGeometry(2.3, 2.3), new THREE.MeshBasicMaterial({ map: aptechWallSignTex }));
aptechWallSign.position.set(-2.9, 2.2, 8.42);
const lowerWhiteWall = new THREE.Mesh(new THREE.BoxGeometry(2.65, 1.3, 0.45), new THREE.MeshStandardMaterial({ color: 0xf8fafc }));
lowerWhiteWall.position.set(-2.9, 0.65, 8.22);
scene.add(blockWall, aptechOuterWall, aptechWallSign, lowerWhiteWall);




const entHeader = new THREE.Mesh(new THREE.BoxGeometry(3.2, 1.1, 0.45), new THREE.MeshBasicMaterial({ map: entranceSignTex }));
entHeader.position.set(0, 3.25, 8.2);
scene.add(entHeader);



const bwBuilding = new THREE.Mesh(
    new THREE.BoxGeometry(9.5, 6.2, 7.5),
    new THREE.MeshStandardMaterial({ map: greenMetalTex, roughness: 0.45 })
);

bwBuilding.position.set(6.4, 3.1, 4.5);
const bwSign = new THREE.Mesh(new THREE.BoxGeometry(6.8, 3.1, 0.25), new THREE.MeshBasicMaterial({ map: broadwaySignTex }));
bwSign.position.set(6.5, 4.1, 8.35);
const bwWebBadge = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.65, 0.2), new THREE.MeshBasicMaterial({ map: bwWebTex }));
bwWebBadge.position.set(3.4, 5.4, 8.35);
const bwWindow = new THREE.Mesh(
    new THREE.PlaneGeometry(7.2, 2.5),
    new THREE.MeshPhysicalMaterial({ color: 0x1e293b, transparent: true, opacity: 0.65 })
);
bwWindow.position.set(6.1, 1.35, 8.28);
scene.add(bwBuilding, bwSign, bwWebBadge, bwWindow);

[2.7, 4.8, 7.5].forEach(px => {
    const pot = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.45, 0.45), new THREE.MeshStandardMaterial({ color: 0x16a34a }));
    pot.position.set(px, 0.38, 8.8);
    const bush = new THREE.Mesh(new THREE.DodecahedronGeometry(0.35), new THREE.MeshStandardMaterial({ color: 0x15803d }));
    bush.position.set(px, 0.75, 8.8);
    scene.add(pot, bush);
});




const numSteps = 13;
const stairStartZ = 7.8;
const stairEndZ = 2.4;
const stairHeight = 2.6;
const stepDepth = (stairStartZ - stairEndZ) / numSteps;
const stepH = stairHeight / numSteps;

const stairMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.5 });
const stairTrimMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.4 });
const stairWallMat = new THREE.MeshStandardMaterial({ color: 0xfef9c3, roughness: 0.7 });

for (let i = 0; i < numSteps; i++) {
    const h = (i + 1) * stepH;
    const z = stairStartZ - (i + 0.5) * stepDepth;
    const step = new THREE.Mesh(new THREE.BoxGeometry(3.0, h, stepDepth + 0.03), stairMat);
    step.position.set(0, h / 2, z);
    scene.add(step);

    const trim = new THREE.Mesh(new THREE.BoxGeometry(3.01, 0.04, 0.06), stairTrimMat);
    trim.position.set(0, h, z + stepDepth / 2);
    scene.add(trim);
}




const swLeft = new THREE.Mesh(new THREE.BoxGeometry(0.25, 6.2, 8.8), stairWallMat);
swLeft.position.set(-1.62, 3.1, 3.8);
const swRight = swLeft.clone();
swRight.position.x = 1.62;
const swCeiling = new THREE.Mesh(new THREE.BoxGeometry(3.5, 0.3, 8.8), stairWallMat);
swCeiling.position.set(0, 6.05, 3.8);
scene.add(swLeft, swRight, swCeiling);




const railBlackMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.3, metalness: 0.7 });
const railYellowMat = new THREE.MeshStandardMaterial({ color: 0xeab308, roughness: 0.4 });
const slopeLen = Math.hypot(stairStartZ - stairEndZ, stairHeight);
const slopeAngle = Math.atan2(stairHeight, stairStartZ - stairEndZ);

const topRail = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, slopeLen, 12), railBlackMat);
topRail.rotation.x = Math.PI / 2 - slopeAngle;
topRail.position.set(1.22, 2.25, 5.1);
scene.add(topRail);

for (let z = 7.4; z >= 0.8; z -= 1.2) {
    const baseH = z > 2.4 ? ((7.8 - z) / 5.4) * 2.6 : 2.6;
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.9, 8), railYellowMat);
    post.position.set(1.22, baseH + 0.45, z);
    scene.add(post);
}
const landingRail = new THREE.Mesh(new THREE.CylinderGeometry(0.038, 0.038, 1.8, 12), railBlackMat);
landingRail.rotation.x = Math.PI / 2;
landingRail.position.set(1.22, 3.5, 1.5);
scene.add(landingRail);





const landingFloor = new THREE.Mesh(
    new THREE.BoxGeometry(6.8, 2.6, 11.2),
    new THREE.MeshStandardMaterial({ color: 0xfef3c7, roughness: 0.25, metalness: 0.1 })
);
landingFloor.position.set(0, 1.3, -3.2);
scene.add(landingFloor);





const doorZ = -0.6;
const doorTopBanner = new THREE.Mesh(
    new THREE.BoxGeometry(3.2, 0.72, 0.22),
    new THREE.MeshBasicMaterial({ map: topDoorBannerTex })
);
doorTopBanner.position.set(0, 5.32, doorZ);
scene.add(doorTopBanner);

const frameYellow = new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.3 });
const frameLeft = new THREE.Mesh(new THREE.BoxGeometry(0.14, 2.45, 0.2), frameYellow);
frameLeft.position.set(-1.53, 3.82, doorZ);
const frameRight = frameLeft.clone();
frameRight.position.x = 1.53;
scene.add(frameLeft, frameRight);

const rightDoorPanel = new THREE.Mesh(
    new THREE.BoxGeometry(1.45, 2.38, 0.08),
    new THREE.MeshBasicMaterial({ map: rightPanelTex })
);
rightDoorPanel.position.set(0.76, 3.8, doorZ);
scene.add(rightDoorPanel);




const glassDoorPivot = new THREE.Group();
glassDoorPivot.position.set(-1.46, 2.6, doorZ);
scene.add(glassDoorPivot);

const glassDoorPane = new THREE.Mesh(
    new THREE.BoxGeometry(1.48, 2.36, 0.04),
    new THREE.MeshPhysicalMaterial({ color: 0xdcfce7, transparent: true, opacity: 0.35, roughness: 0.05 })
);
glassDoorPane.position.set(0.74, 1.19, 0);
const silverMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.9, roughness: 0.15 });
const handleBar = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.75, 12), silverMat);
handleBar.position.set(1.26, 1.15, 0.08);
const handleBarBack = handleBar.clone();
handleBarBack.position.z = -0.08;
glassDoorPivot.add(glassDoorPane, handleBar, handleBarBack);





const intLeftWall = new THREE.Mesh(new THREE.BoxGeometry(0.25, 3.6, 8.2), stairWallMat);
intLeftWall.position.set(-3.3, 4.4, -4.6);
const intRightWall = intLeftWall.clone();
intRightWall.position.x = 3.3;
const intBackWall = new THREE.Mesh(new THREE.BoxGeometry(6.8, 3.6, 0.25), new THREE.MeshStandardMaterial({ color: 0x0f172a }));
intBackWall.position.set(0, 4.4, -8.5);
const intCeiling = new THREE.Mesh(new THREE.BoxGeometry(6.8, 0.25, 8.2), new THREE.MeshStandardMaterial({ color: 0xffffff }));
intCeiling.position.set(0, 6.1, -4.6);
scene.add(intLeftWall, intRightWall, intBackWall, intCeiling);

[-3.05, 3.05].forEach(px => {
    for (let pz = -1.6; pz >= -7.2; pz -= 1.8) {
        const pillar = new THREE.Mesh(
            new THREE.BoxGeometry(0.28, 3.4, 0.28),
            new THREE.MeshStandardMaterial({ color: 0xfacc15, emissive: 0x553f00, emissiveIntensity: 0.3 })
        );
        pillar.position.set(px, 4.3, pz);
        scene.add(pillar);
    }
});





const promoCanvas = document.createElement('canvas');
promoCanvas.width = 1024;
promoCanvas.height = 576;
const pCtx = promoCanvas.getContext('2d');
const promoCanvasTex = new THREE.CanvasTexture(promoCanvas);
promoCanvasTex.colorSpace = THREE.SRGBColorSpace;





const tvFrame = new THREE.Mesh(
    new THREE.BoxGeometry(4.9, 2.8, 0.16),
    new THREE.MeshStandardMaterial({ color: 0x111827, metalness: 0.7, roughness: 0.3 })
);
tvFrame.position.set(0, 4.45, -7.8);
scene.add(tvFrame);

const tvScreenMat = new THREE.MeshBasicMaterial({ map: promoCanvasTex });
const tvScreen = new THREE.Mesh(new THREE.PlaneGeometry(4.65, 2.58), tvScreenMat);
tvScreen.position.set(0, 4.45, -7.7);
scene.add(tvScreen);




// const tvGlow = new THREE.PointLight(0x00d4ff, 1.5, 8);
// tvGlow.position.set(0, 4.4, -6.5);
// scene.add(tvGlow);

// let promoStarted = false;
// let promoTime = 0;
// let usingCustomMP4 = false;

// function renderPromoVideoFrame(t) {
//     if (usingCustomMP4) return;
//     const w = promoCanvas.width, h = promoCanvas.height;

//     if (!promoStarted) {
//         pCtx.fillStyle = '#071229';
//         pCtx.fillRect(0, 0, w, h);
//         pCtx.fillStyle = '#facc15';
//         pCtx.font = 'bold 48px Arial';
//         pCtx.textAlign = 'center';
//         pCtx.fillText('APTECH  KORANGI', w / 2, h / 2 - 20);
//         pCtx.fillStyle = '#00e5ff';
//         pCtx.font = '28px Arial';
//         pCtx.fillText('Enter inside to start Promo Video ▶', w / 2, h / 2 + 40);
//         promoCanvasTex.needsUpdate = true;
//         return;
//     }





//     const loopT = t % 16;
//     const sceneIdx = Math.floor(loopT / 4);
//     const localT = loopT % 4;



//     const grad = pCtx.createLinearGradient(0, 0, w, h);
//     grad.addColorStop(0, '#040c24');
//     grad.addColorStop(1, sceneIdx % 2 === 0 ? '#0c2354' : '#1e1b4b');
//     pCtx.fillStyle = grad;
//     pCtx.fillRect(0, 0, w, h);


//     pCtx.strokeStyle = 'rgba(0, 229, 255, 0.16)';
//     pCtx.lineWidth = 2;
//     const offset = (t * 60) % 64;
//     for (let gx = offset; gx < w; gx += 64) {
//         pCtx.beginPath(); pCtx.moveTo(gx, 0); pCtx.lineTo(gx, h); pCtx.stroke();
//     }
//     for (let gy = 0; gy < h; gy += 64) {
//         pCtx.beginPath(); pCtx.moveTo(0, gy); pCtx.lineTo(w, gy); pCtx.stroke();
//     }

//     pCtx.textAlign = 'center';
//     const slideIn = Math.min(1, localT * 2.5);
//     pCtx.globalAlpha = slideIn;

//     if (sceneIdx === 0) {


//         pCtx.fillStyle = '#facc15';
//         pCtx.font = '900 72px Arial';
//         pCtx.fillText('APTECH LEARNING', w / 2, 220);
//         pCtx.fillStyle = '#ffffff';
//         pCtx.font = 'bold 44px Arial';
//         pCtx.fillText('KORANGI CENTER • UNLEASH YOUR POTENTIAL', w / 2, 300);
//         pCtx.fillStyle = '#00e5ff';
//         pCtx.font = 'bold 30px Arial';
//         pCtx.fillText('Building Future Tech Leaders Since 1986', w / 2, 380);
//     } else if (sceneIdx === 1) {

//         pCtx.fillStyle = '#ef4444';
//         pCtx.font = '900 92px Arial';
//         pCtx.fillText('ACCP', w / 2 - 110, 250);
//         pCtx.fillStyle = '#00e5ff';
//         pCtx.fillText('AI+', w / 2 + 125, 250);
//         pCtx.fillStyle = '#ffffff';
//         pCtx.font = 'bold 36px Arial';
//         pCtx.fillText('3-YEAR SOFTWARE & ARTIFICIAL INTELLIGENCE DIPLOMA', w / 2, 340);
//         pCtx.fillStyle = '#facc15';
//         pCtx.font = '28px Arial';
//         pCtx.fillText('6 Semesters • Practical Labs • E-Projects', w / 2, 405);
//     } else if (sceneIdx === 2) {

//         pCtx.fillStyle = '#facc15';
//         pCtx.font = '900 54px Arial';
//         pCtx.fillText('SKILLS YOU WILL MASTER', w / 2, 145);

//         const skills = ['PYTHON & GEN-AI', 'FULL-STACK WEB', 'FLUTTER APPS', 'CLOUD & DATA'];
//         skills.forEach((sk, idx) => {
//             const bx = idx % 2 === 0 ? 110 : 540;
//             const by = idx < 2 ? 210 : 340;
//             pCtx.fillStyle = 'rgba(0, 229, 255, 0.18)';
//             pCtx.fillRect(bx, by, 370, 95);
//             pCtx.strokeStyle = '#00e5ff';
//             pCtx.strokeRect(bx, by, 370, 95);
//             pCtx.fillStyle = '#ffffff';
//             pCtx.font = 'bold 30px Arial';
//             pCtx.fillText(sk, bx + 185, by + 58);
//         });
//     } else {

//         pCtx.fillStyle = '#00ffaa';
//         pCtx.font = '900 74px Arial';
//         pCtx.fillText('ADMISSIONS OPEN!', w / 2, 220);
//         pCtx.fillStyle = '#ffffff';
//         pCtx.font = 'bold 36px Arial';
//         pCtx.fillText('Morning • Afternoon • Evening Shifts Available', w / 2, 305);
//         pCtx.fillStyle = '#facc15';
//         pCtx.font = 'bold 34px Arial';
//         pCtx.fillText('Visit Aptech Korangi Reception Desk Today!', w / 2, 385);
//     }

//     pCtx.globalAlpha = 1;


//     pCtx.fillStyle = 'rgba(255,255,255,0.2)';
//     pCtx.fillRect(40, h - 26, w - 80, 8);
//     pCtx.fillStyle = '#ef4444';
//     pCtx.fillRect(40, h - 26, ((loopT / 16) * (w - 80)), 8);

//     pCtx.fillStyle = '#ef4444';
//     pCtx.fillRect(36, 28, 175, 38);
//     pCtx.fillStyle = '#fff';
//     pCtx.font = 'bold 20px Arial';
//     pCtx.fillText('▶ PROMO VIDEO', 124, 54);

//     promoCanvasTex.needsUpdate = true;
// }



// const customVideoEl = document.getElementById('custom-mp4-video');
// const uploadVideoBtn = document.getElementById('upload-video-btn');
// const customVideoInput = document.getElementById('custom-video-input');

// uploadVideoBtn.addEventListener('click', () => customVideoInput.click());
// customVideoInput.addEventListener('change', (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     customVideoEl.src = URL.createObjectURL(file);
//     customVideoEl.play();
//     const vidTex = new THREE.VideoTexture(customVideoEl);
//     vidTex.colorSpace = THREE.SRGBColorSpace;
//     tvScreenMat.map = vidTex;
//     tvScreenMat.needsUpdate = true;
//     usingCustomMP4 = true;
//     appendMessage(`Video Play`, 'bot');
// });


const tvGlow = new THREE.PointLight(0x00d4ff, 1.5, 8);
tvGlow.position.set(0, 4.4, -6.5);
scene.add(tvGlow);

let promoStarted = false;
let promoTime = 0;
let usingCustomMP4 = false;

const customVideoEl = document.getElementById('custom-mp4-video');

function renderPromoVideoFrame(t) {
    if (usingCustomMP4) return;

    const w = promoCanvas.width;
    const h = promoCanvas.height;

    if (!promoStarted) {
        pCtx.fillStyle = '#071229';
        pCtx.fillRect(0, 0, w, h);

        pCtx.fillStyle = '#facc15';
        pCtx.font = 'bold 48px Arial';
        pCtx.textAlign = 'center';
        pCtx.fillText('APTECH KORANGI', w / 2, h / 2);

        promoCanvasTex.needsUpdate = true;
        return;
    }
}

function startCustomPromoVideo() {

    if (!customVideoEl || usingCustomMP4) return;

    const vidTex = new THREE.VideoTexture(customVideoEl);

    vidTex.colorSpace = THREE.SRGBColorSpace;

    tvScreenMat.map = vidTex;
    tvScreenMat.needsUpdate = true;

    usingCustomMP4 = true;

    customVideoEl.currentTime = 0;

    customVideoEl.play().catch(error => {
        console.error('Video playback error:', error);
    });
}









const aptron = new THREE.Group();

aptron.position.set(-0.55, 2.6, 0.55);
scene.add(aptron);

const mWhite = new THREE.MeshStandardMaterial({ color: 0xf4f7fc, roughness: 0.35 });
const mNavy = new THREE.MeshStandardMaterial({ color: 0x0c224d, roughness: 0.5 });
const mRed = new THREE.MeshStandardMaterial({ color: 0xe62229, roughness: 0.4 });
const mVisor = new THREE.MeshStandardMaterial({ color: 0x040914, roughness: 0.1, metalness: 0.85 });
const mCyan = new THREE.MeshBasicMaterial({ color: 0x00e5ff });
const mDark = new THREE.MeshStandardMaterial({ color: 0x1a2639, metalness: 0.7 });

function makePlus(size, thick, depth, mat) {
    const g = new THREE.Group();
    g.add(
        new THREE.Mesh(new THREE.BoxGeometry(size, thick, depth), mat),
        new THREE.Mesh(new THREE.BoxGeometry(thick, size, depth), mat)
    );
    return g;
}

const chestTex = makeTex(512, 256, (ctx) => {
    ctx.fillStyle = '#f4f7fc'; ctx.fillRect(0, 0, 512, 256);
    ctx.font = '900 74px Arial'; ctx.textBaseline = 'middle';
    ctx.fillStyle = '#e62229'; ctx.fillText('ACCP', 40, 128);
    ctx.fillStyle = '#0066ff'; ctx.fillText('AI+', 275, 128);
});

[-1, 1].forEach((side) => {
    const x = side * 0.21;
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.11, 0.58, 16), mNavy);
    leg.position.set(x, 0.52, 0);
    const shoe = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.14, 0.4), mWhite);
    shoe.position.set(x, 0.11, 0.05);
    const sole = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.04, 0.41), mCyan);
    sole.position.set(x, 0.04, 0.05);
    aptron.add(leg, shoe, sole);
});

const torso = new THREE.Group();
torso.position.y = 1.18;
aptron.add(torso);

const body = new THREE.Mesh(new THREE.CylinderGeometry(0.33, 0.36, 0.66, 24), mWhite);
body.scale.set(1.1, 1, 0.85);
const chest = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.24), new THREE.MeshBasicMaterial({ map: chestTex }));
chest.position.set(0, 0.08, 0.31);
const hood = new THREE.Mesh(new THREE.TorusGeometry(0.24, 0.08, 12, 24), mRed);
hood.rotation.x = Math.PI / 2.2;
hood.position.set(0, 0.33, -0.02);
const backpack = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.5, 0.2), mNavy);
backpack.position.set(0, 0, -0.3);
torso.add(body, chest, hood, backpack);

const rightArm = new THREE.Group();
rightArm.position.set(-0.43, 0.2, 0);
const rArm = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.08, 0.5, 14), mWhite);
rArm.position.set(-0.07, -0.2, 0.08);
rArm.rotation.z = -0.3;
const rGlove = new THREE.Mesh(new THREE.SphereGeometry(0.1, 14, 14), mNavy);
rGlove.position.set(-0.14, -0.44, 0.11);
rightArm.add(rArm, rGlove);
torso.add(rightArm);

const leftArm = new THREE.Group();
leftArm.position.set(0.43, 0.2, 0);
const lArm = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.08, 0.48, 14), mNavy);
lArm.position.set(0.16, -0.09, 0.13);
lArm.rotation.z = 0.72; lArm.rotation.x = -0.48;
const lGlove = new THREE.Mesh(new THREE.SphereGeometry(0.1, 14, 14), mWhite);
lGlove.position.set(0.35, -0.04, 0.26);
leftArm.add(lArm, lGlove);
torso.add(leftArm);

const holoPlus = makePlus(0.35, 0.11, 0.07, mCyan);
holoPlus.position.set(0.78, 1.54, 0.32);
aptron.add(holoPlus);

const head = new THREE.Group();
head.position.set(0, 1.69, 0);
aptron.add(head);

const helmet = new THREE.Mesh(new THREE.SphereGeometry(0.45, 28, 24), mWhite);
helmet.scale.set(1.15, 0.92, 0.95);
helmet.position.y = 0.32;
const visor = new THREE.Mesh(new THREE.SphereGeometry(0.39, 28, 20), mVisor);
visor.scale.set(1.08, 0.76, 0.5);
visor.position.set(0, 0.31, 0.24);
const eyeL = makePlus(0.16, 0.048, 0.03, mCyan);
eyeL.position.set(-0.14, 0.32, 0.44);
const eyeR = makePlus(0.16, 0.048, 0.03, mCyan);
eyeR.position.set(0.14, 0.32, 0.44);

[-1, 1].forEach((side) => {
    const ear = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.17, 0.11, 20), mDark);
    ear.rotation.z = Math.PI / 2;
    ear.position.set(side * 0.52, 0.32, 0);
    const earGlow = new THREE.Mesh(new THREE.TorusGeometry(0.13, 0.02, 10, 24), mCyan);
    earGlow.rotation.y = Math.PI / 2;
    earGlow.position.set(side * 0.58, 0.32, 0);
    head.add(ear, earGlow);
});
head.add(helmet, visor, eyeL, eyeR);



const player = {
    x: 0.4,
    y: 0,
    z: 13.8,
    yaw: 0.04,
    pitch: 0.04,
    speed: 3.5,
    eyeHeight: 1.66
};

let autoWalkTargetZ = null;
let hasGreetedOutside = false;
let aptronBlocking = true;
let aptronTargetX = -0.55;
let isTalking = false;
let isWaving = false;
let doorAngle = 0;

const keys = {};
const userInput = document.getElementById('user-input');
const speechBubble = document.getElementById('speech-bubble');
const botState = document.getElementById('bot-state');
// const zoneIndicator = document.getElementById('zone-indicator');
// const autoWalkBtn = document.getElementById('auto-walk-btn');
const enterBtn = document.getElementById('enter-aptech-btn');

window.addEventListener('keydown', (e) => {
    if (document.activeElement === userInput) return;
    keys[e.code] = true;
    if (['KeyW', 'ArrowUp', 'KeyS', 'ArrowDown'].includes(e.code)) autoWalkTargetZ = null;
});
window.addEventListener('keyup', (e) => { keys[e.code] = false; });

const btnFwd = document.getElementById('btn-fwd');
const btnBack = document.getElementById('btn-back');
btnFwd.addEventListener('mousedown', () => { keys['KeyW'] = true; autoWalkTargetZ = null; });
btnFwd.addEventListener('mouseup', () => { keys['KeyW'] = false; });
btnFwd.addEventListener('touchstart', (e) => { e.preventDefault(); keys['KeyW'] = true; autoWalkTargetZ = null; });
btnFwd.addEventListener('touchend', () => { keys['KeyW'] = false; });

btnBack.addEventListener('mousedown', () => { keys['KeyS'] = true; autoWalkTargetZ = null; });
btnBack.addEventListener('mouseup', () => { keys['KeyS'] = false; });
btnBack.addEventListener('touchstart', (e) => { e.preventDefault(); keys['KeyS'] = true; autoWalkTargetZ = null; });
btnBack.addEventListener('touchend', () => { keys['KeyS'] = false; });

let isDragging = false, prevX = 0, prevY = 0;
renderer.domElement.addEventListener('mousedown', (e) => { isDragging = true; prevX = e.clientX; prevY = e.clientY; });
window.addEventListener('mouseup', () => { isDragging = false; });
window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    player.yaw += (e.clientX - prevX) * 0.004;
    player.pitch = THREE.MathUtils.clamp(player.pitch + (e.clientY - prevY) * 0.004, -0.5, 0.5);
    prevX = e.clientX; prevY = e.clientY;
});

// autoWalkBtn.addEventListener('click', () => {
//     autoWalkTargetZ = 1.65;
//     player.pitch = 0.02;
// });







// function openDoorAndEnter() {
//     aptronBlocking = false;
//     aptronTargetX = 0.72;
//     enterBtn.style.display = 'none';
//     autoWalkTargetZ = -2.8;
//     // const msg = "Aayein! Glass door khul gaya hai — andar Aptech Korangi ki Promo Video dekhein! ";
//     // appendMessage(msg, 'bot');
//     // showBubble("Welcome inside! Enjoy the Promo 🎬");
//     // speakText(msg);
// }
// enterBtn.addEventListener('click', () => {
//     openDoorAndEnter();
// });

function openDoorAndEnter() {

    aptronBlocking = false;

    aptronTargetX = 0.72;

    enterBtn.style.display = 'none';

    autoWalkTargetZ = -2.8;

}

enterBtn.addEventListener('click', () => {

    openDoorAndEnter();

});





// function playPromoJingle() {
//     try {
//         const AudioCtx = window.AudioContext || window.webkitAudioContext;
//         const ctx = new AudioCtx();
//         const notes = [523.25, 659.25, 783.99, 1046.5];
//         notes.forEach((freq, i) => {
//             const osc = ctx.createOscillator();
//             const gain = ctx.createGain();
//             osc.type = 'sine';
//             osc.frequency.value = freq;
//             gain.gain.setValueAtTime(0.08, ctx.currentTime + i * 0.14);
//             gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.14 + 0.45);
//             osc.connect(gain); gain.connect(ctx.destination);
//             osc.start(ctx.currentTime + i * 0.14);
//             osc.stop(ctx.currentTime + i * 0.14 + 0.46);
//         });
//     } catch (_) { }
// }

// function startInsidePromo() {
//     promoStarted = true;
//     promoTime = 0;
//     uploadVideoBtn.style.display = 'inline-block';
//     autoWalkBtn.style.display = 'none';
//     botState.textContent = 'Inside Aptech • Promo Video Playing 🎬';
//     playPromoJingle();

//     const msg = `🎬 <b>Aptech Korangi Promo Video Started!</b><br>Samne LED screen par hamara <b>ACCP AI+</b> promo chal raha hai. Aap chahein to <b>"🎬 Load Custom MP4"</b> se apni video bhi play kar sakte hain!`;
//     appendMessage(msg, 'bot');
//     speakText("Welcome inside Aptech Learning Korangi Center! Please watch our ACCP AI plus promo video on the main screen.");
// }

function getSurfaceHeight(z) {
    if (z >= stairStartZ) return 0;
    if (z <= stairEndZ) return stairHeight;
    const prog = (stairStartZ - z) / (stairStartZ - stairEndZ);
    const stepIdx = Math.floor(prog * numSteps);
    return Math.min(stairHeight, (stepIdx + 0.65) * stepH);
}

function showBubble(txt) {
    speechBubble.textContent = txt;
    speechBubble.classList.add('visible');
}

function triggerOutsideGreeting() {
    hasGreetedOutside = true;
    isWaving = true;
    botState.textContent = 'Standing outside glass door';
    enterBtn.style.display = 'inline-block';

    const msg = "Hi! How may I help you?";

    appendMessage(msg, 'bot');
    showBubble(msg);
    speakText(msg);
    setTimeout(() => { isWaving = false; }, 2600);
}

function updateBubblePos() {
    const pos = new THREE.Vector3(aptron.position.x, aptron.position.y + 2.45, aptron.position.z);
    pos.project(camera);
    if (pos.z > 1) { speechBubble.classList.remove('visible'); return; }
    speechBubble.style.left = `${(pos.x * 0.5 + 0.5) * container.clientWidth}px`;
    speechBubble.style.top = `${(-pos.y * 0.5 + 0.5) * container.clientHeight}px`;
}

const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    const dt = Math.min(clock.getDelta(), 0.05);
    const t = clock.getElapsedTime();

    let fwd = 0, strafe = 0;
    if (keys['KeyW'] || keys['ArrowUp']) fwd += 1;
    if (keys['KeyS'] || keys['ArrowDown']) fwd -= 1;
    if (keys['KeyA'] || keys['ArrowLeft']) strafe -= 1;
    if (keys['KeyD'] || keys['ArrowRight']) strafe += 1;

    if (autoWalkTargetZ !== null) {
        if (player.z > autoWalkTargetZ) {
            fwd = 1;
            const targetWalkX = player.z > 2.4 ? 0 : -0.62; // Line up with left glass door!
            player.x = THREE.MathUtils.lerp(player.x, targetWalkX, 0.07);
            player.yaw = THREE.MathUtils.lerp(player.yaw, 0, 0.08);
        } else {
            autoWalkTargetZ = null;
        }
    }

    if (fwd !== 0 || strafe !== 0) {
        const sY = Math.sin(player.yaw), cY = Math.cos(player.yaw);
        const nx = player.x + (strafe * cY - fwd * sY) * player.speed * dt;
        const nz = player.z + (-fwd * cY - strafe * sY) * player.speed * dt;

        let minX = -6, maxX = 8;
        if (nz <= 8.2 && nz > 2.2) { minX = -1.15; maxX = 1.0; }
        else if (nz <= 2.2 && nz > -0.6) { minX = -1.25; maxX = 0.85; }
        else if (nz <= -0.6) { minX = -2.6; maxX = 2.6; }

        let finalZ = nz;
        // Solid Right Fixed Door Panel at z = -0.6
        if (nz < -0.25 && player.z >= -0.25 && nx > -0.05) {
            finalZ = -0.25;
        }

        // Aptron blocks outside the glass door at z = 0.55 until you ask/click to enter!
        let minZ = -5.2;
        if (aptronBlocking && Math.abs(nx - aptron.position.x) < 1.15) {
            minZ = 1.48;
        }

        player.x = THREE.MathUtils.clamp(nx, minX, maxX);
        player.z = THREE.MathUtils.clamp(finalZ, minZ, 15.5);
    }

    // Zone Indicator
    // if (player.z > 8.2) zoneIndicator.textContent = "📍 Outside: Broadway Pizza & Aptech Entrance";
    // else if (player.z > 2.4) zoneIndicator.textContent = "🪜 Climbing Stairs...";
    // else if (player.z > -0.6) zoneIndicator.textContent = "🤖 Top Landing (Outside Glass Door) • Aptron";
    // else zoneIndicator.textContent = "🎬 Inside Aptech Korangi • Promo Video";


    const targetDoorAngle = (!aptronBlocking && player.z < 1.6) ? Math.PI / 2.1 : 0;
    doorAngle = THREE.MathUtils.lerp(doorAngle, targetDoorAngle, 0.08);
    glassDoorPivot.rotation.y = doorAngle;


    player.y = THREE.MathUtils.lerp(player.y, getSurfaceHeight(player.z), 0.18);
    const bob = (fwd !== 0 || strafe !== 0) ? Math.sin(t * 11) * 0.035 : 0;
    camera.position.set(player.x, player.y + player.eyeHeight + bob, player.z);
    const lookDir = new THREE.Vector3(
        -Math.sin(player.yaw) * Math.cos(player.pitch),
        Math.sin(player.pitch),
        -Math.cos(player.yaw) * Math.cos(player.pitch)
    );
    camera.lookAt(camera.position.clone().add(lookDir));




    if (!hasGreetedOutside && player.z <= 2.1) {
        triggerOutsideGreeting();
    }

    if (!promoStarted && player.z < -0.75) {
        promoStarted = true;
        promoTime = 0;

        startCustomPromoVideo();

        botState.textContent = 'Welcome to Aptech Korangi Crossing!';

    }


    if (promoStarted) promoTime += dt;
    renderPromoVideoFrame(promoTime);




    aptron.position.x = THREE.MathUtils.lerp(aptron.position.x, aptronTargetX, 0.06);
    torso.position.y = 1.18 + Math.sin(t * 2.5) * 0.015;
    head.position.y = 1.69 + Math.sin(t * 2.5) * 0.02;

    const ang = Math.atan2(player.x - aptron.position.x, player.z - aptron.position.z);
    aptron.rotation.y = THREE.MathUtils.lerp(aptron.rotation.y, THREE.MathUtils.clamp(ang, -0.8, 0.8), 0.08);

    rightArm.rotation.z = isWaving ? -2.2 + Math.sin(t * 12) * 0.35 : THREE.MathUtils.lerp(rightArm.rotation.z, 0, 0.1);
    if (isTalking) {
        head.rotation.x = Math.sin(t * 15) * 0.06;
        const s = 1 + Math.sin(t * 16) * 0.14;
        eyeL.scale.set(s, s, 1); eyeR.scale.set(s, s, 1);
    } else {
        head.rotation.x = THREE.MathUtils.lerp(head.rotation.x, 0, 0.1);
        eyeL.scale.set(1, 1, 1); eyeR.scale.set(1, 1, 1);
    }

    holoPlus.position.y = 1.54 + Math.sin(t * 3) * 0.05;
    holoPlus.rotation.y = t * 1.8;

    if (hasGreetedOutside) updateBubblePos();
    renderer.render(scene, camera);
}
animate();





window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
});

// ==================================================
// 7. APTECH KORANGI AI CHATBOT
// ==================================================
const chatMessages = document.getElementById('chat-messages');
const chatForm = document.getElementById('chat-form');
const sendButton = chatForm.querySelector('button[type="submit"]');
const voiceToggle = document.getElementById('voice-toggle');
let voiceEnabled = true;

voiceToggle.addEventListener('click', () => {
    voiceEnabled = !voiceEnabled;
    voiceToggle.classList.toggle('active', voiceEnabled);
    voiceToggle.textContent = voiceEnabled ? 'Voice: ON' : 'Voice: OFF';
    if (!voiceEnabled && 'speechSynthesis' in window) window.speechSynthesis.cancel();
});

// function speakText(html) {
//     if (!voiceEnabled || !('speechSynthesis' in window)) return;
//     window.speechSynthesis.cancel();
//     const u = new SpeechSynthesisUtterance(html.replace(/<[^>]*>?/gm, ''));
//     u.rate = 1.05; u.pitch = 1.1;
//     u.onstart = () => { isTalking = true; };
//     u.onend = () => { isTalking = false; };
//     window.speechSynthesis.speak(u);
// }

// const kb = [
//     {
//         keys: ['accp', 'ai+', 'program', 'diploma'],
//         reply: `<b>ACCP AI+</b> Aptech Korangi ka <b>3-Year (6 Semesters)</b> flagship IT & AI career program hai! Web Dev, Python, Full-Stack, Cloud aur Generative AI ismein shamil hain.`
//     },
//     {
//         keys: ['course', 'short', 'python', 'web', 'flutter', 'duration'],
//         reply: `Aptech Korangi mein short courses (3–6 months): Web Development (MERN/Laravel), Python & AI, Flutter App Dev, aur UI/UX Designing.`
//     },
//     {
//         keys: ['timing', 'fee', 'fees', 'admission', 'time'],
//         reply: `🕒 <b>Timings:</b> Morning, Afternoon & Evening shifts (MWF / TTS).<br>💳 <b>Admission:</b> Matric/O-Levels ke baad monthly installments aur scholarships available hain!`
//     },
//     {
//         keys: ['andar', 'gate', 'kholo', 'open', 'promo', 'video', 'rasta'],
//         reply: `Bilkul bro! Main side par ho raha hoon aur glass door khol raha hoon — andar ja kar Aptech Promo Video dekhein!`
//     }
// ];

// function getReply(q) {
//     const lower = q.toLowerCase();
//     // if (['andar', 'gate', 'kholo', 'open', 'rasta', 'pass'].some(k => lower.includes(k))) {
//     //     setTimeout(openDoorAndEnter, 400);
//     // }
//     for (const item of kb) {
//         if (item.keys.some(k => lower.includes(k))) return item.reply;
//     }
//     return `Main <b>Aptech Korangi Center</b> ka <b>ACCP AI+</b> assistant hoon! Aap courses, timings, ya andar jaane ke baare mein pooch sakte hain.`;
// }

// function handleChat(text) {
//     alert(text);
//     if (!text.trim()) return;
//     appendMessage(text, 'user');
//     userInput.value = '';
//     botState.textContent = 'Processing...';
//     isTalking = true;

//     setTimeout(() => {
//         const reply = getReply(text);
//         appendMessage(reply, 'bot');
//         showBubble(reply.replace(/<[^>]*>?/gm, '').slice(0, 46) + '...');
//         if (voiceEnabled) speakText(reply);
//         else setTimeout(() => { isTalking = false; }, 1200);
//     }, 450);
// }
// function appendMessage(html, sender) {
//     const d = document.createElement('div');
//     d.className = `msg ${sender}`;
//     d.innerHTML = html;
//     chatMessages.appendChild(d);
//     chatMessages.scrollTop = chatMessages.scrollHeight;
// }


// chatForm.addEventListener('submit', (e) => { e.preventDefault(); handleChat(userInput.value); });
// window.sendQuick = (text) => handleChat(text);

// Text to Speech
function speakText(html) {

    if (!voiceEnabled || !('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();

    const text = html.replace(/<[^>]*>?/gm, '');

    const u = new SpeechSynthesisUtterance(text);

    u.rate = 1.05;
    u.pitch = 1.1;

    u.onstart = () => {
        isTalking = true;
    };

    u.onend = () => {
        isTalking = false;
    };

    window.speechSynthesis.speak(u);
}


// Append Chat Message
function appendMessage(text, sender) {

    const d = document.createElement('div');

    d.className = `msg ${sender}`;

    d.textContent = text;

    chatMessages.appendChild(d);

    chatMessages.scrollTop = chatMessages.scrollHeight;

    return d;
}


// Gemini AI Chat Function
async function handleChat(text) {

    if (!text || !text.trim()) return;

    userInput.disabled = true;
    sendButton.disabled = true;
    sendButton.textContent = 'Processing...';

    appendMessage(text, 'user');

    userInput.value = '';

    botState.textContent = 'Thinking...';

    isTalking = true;


    const loading = appendMessage('Typing...', 'bot');

    try {

        const csrfToken = document.querySelector(
            'meta[name="csrf-token"]'
        )?.content;

        const response = await fetch('/api/chat', {

            method: 'POST',

            credentials: 'same-origin',

            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-CSRF-TOKEN': csrfToken || ''
            },

            body: JSON.stringify({
                message: text
            })

        });


        const raw = await response.text();

        console.log('HTTP Status:', response.status);
        console.log('Laravel Response:', raw);


        let data;

        try {

            data = JSON.parse(raw);

        } catch (error) {

            throw new Error(
                'Invalid server response.'
            );

        }

        loading.remove();


        if (!response.ok) {

            throw new Error(
                data.error ||
                data.message ||
                'HTTP Error: ' + response.status
            );

        }

        if (!response.ok || !data.reply) {
            throw new Error(
                data.error || 'Gemini did not return a reply.'
            );


        }


        const reply = data.reply;


        appendMessage(reply, 'bot');

        // Update 3D character
        showBubble(
            reply.replace(/<[^>]*>?/gm, '').slice(0, 46) + '...'
        );

        // Voice response
        if (voiceEnabled) {

            speakText(reply);

        } else {

            isTalking = false;

        }

    } catch (error) {

        loading.remove();

        console.error('Chat Error:', error);

        appendMessage(
            'Sorry! ' + error.message,
            'bot'
        );

        isTalking = false;

    } finally {
        userInput.disabled = false;
        sendButton.disabled = false;


        sendButton.textContent = 'Send';

        botState.textContent = 'Ready to chat';

    }

}


chatForm.addEventListener('submit', function (e) {

    e.preventDefault();

    handleChat(userInput.value);

});



window.sendQuick = function (text) {

    handleChat(text);

};
