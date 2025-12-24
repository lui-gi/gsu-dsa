const menuData = [
    {
        name: "System",
        icon: "fa-solid fa-gear",
        items: [
            { name: "About GSU DSA", icon: "fa-solid fa-circle-info" }
        ]
    },
    {
        name: "Linear Structures",
        icon: "fa-solid fa-bars",
        items: [
            { name: "Stack", icon: "fa-solid fa-layer-group" },
            { name: "Queue", icon: "fa-solid fa-bars-staggered" },
            { name: "Singly Linked List", icon: "fa-solid fa-link" },
            { name: "Doubly Linked List", icon: "fa-solid fa-arrows-left-right" }
        ]
    },
    {
        name: "Key-Value Stores",
        icon: "fa-solid fa-key",
        items: [
            { name: "Dictionary", icon: "fa-solid fa-book" },
            { name: "Hash Table", icon: "fa-solid fa-hashtag" }
        ]
    },
    {
        name: "Trees",
        icon: "fa-solid fa-diagram-project",
        items: [
            { name: "Binary Tree", icon: "fa-solid fa-code-fork" },
            { name: "Heap", icon: "fa-solid fa-sitemap" },
            { name: "AVL Tree", icon: "fa-solid fa-code-merge" },
            { name: "Trie", icon: "fa-solid fa-chart-diagram" }
        ]
    },
    {
        name: "Graphs & Algorithms",
        icon: "fa-solid fa-bezier-curve",
        items: [
            { name: "Graph Representation", icon: "fa-solid fa-project-diagram" },
            { name: "Topological Sort", icon: "fa-solid fa-arrow-down-short-wide" },
            { name: "Dijkstra's Algorithm", icon: "fa-solid fa-route" }
        ]
    }
];

const itemToPath = {
    "About GSU DSA": "system/about.html",
    "Stack": "structures/linear-structures/stack.html",
    "Queue": "structures/linear-structures/queue.html",
    "Singly Linked List": "structures/linear-structures/singly-linked-list.html",
    "Doubly Linked List": "structures/linear-structures/doubly-linked-list.html",
    "Dictionary": "structures/key-value-stores/dictionary.html",
    "Hash Table": "structures/key-value-stores/hash-table.html",
    "Binary Tree": "structures/trees/binary-tree.html",
    "Heap": "structures/trees/heap.html",
    "AVL Tree": "structures/trees/avl-tree.html",
    "Trie": "structures/trees/trie.html",
    "Graph Representation": "structures/graphs-and-algorithms/graph-representation.html",
    "Topological Sort": "structures/graphs-and-algorithms/topological-sort.html",
    "Dijkstra's Algorithm": "structures/graphs-and-algorithms/dijkstras-algorithm.html"
};

let currentCat = 1; 
let currentItem = 0; 
const rowEl = document.getElementById('category-row');
const ICON_SPACING = 200;
const ITEM_HEIGHT = 80;

function init() {
    render();
    updatePos();
    initBackground(); // Initialize the PS3 wave background
}

function render() {
    rowEl.innerHTML = '';
    menuData.forEach((cat, cIdx) => {
        const group = document.createElement('div');
        group.className = 'category-group';
        group.id = `cat-${cIdx}`;
        group.style.left = `${cIdx * ICON_SPACING}px`;

        const label = document.createElement('div');
        label.className = 'cat-label';
        label.innerText = cat.name;

        const icon = document.createElement('div');
        icon.className = 'cat-icon';
        icon.style.cursor = 'pointer';
        icon.innerHTML = `<i class="${cat.icon}" style="font-size: 48px; color: #0039A6;"></i>`;
        
        icon.addEventListener('click', () => {
            currentCat = cIdx;
            currentItem = 0;
            updatePos();
        });

        icon.addEventListener('mouseenter', () => {
            if (cIdx !== currentCat) {
                group.classList.add('hovered');
            }
        });

        icon.addEventListener('mouseleave', () => {
            if (cIdx !== currentCat) {
                group.classList.remove('hovered');
            }
        });

        const col = document.createElement('div');
        col.className = 'item-col';
        col.id = `col-${cIdx}`;

        cat.items.forEach((itemObj, iIdx) => {
            const item = document.createElement('div');
            item.className = 'item';
            item.style.cursor = 'pointer';
            item.innerHTML = `<i class="${itemObj.icon} item-fa-icon"></i><span>${itemObj.name}</span>`;
            
            item.addEventListener('click', () => {
                if (currentCat === cIdx) {
                    currentItem = iIdx;
                    updatePos();
                    loadInIframe(itemObj.name);
                } else {
                    currentCat = cIdx;
                    currentItem = iIdx;
                    updatePos();
                    loadInIframe(itemObj.name);
                }
            });

            item.addEventListener('mouseenter', () => {
                if (cIdx === currentCat && iIdx !== currentItem) {
                    item.classList.add('hovered');
                }
            });

            item.addEventListener('mouseleave', () => {
                if (cIdx === currentCat && iIdx !== currentItem) {
                    item.classList.remove('hovered');
                }
            });
            col.appendChild(item);
        });

        group.append(label, icon, col);
        rowEl.appendChild(group);
    });
}

function updatePos() {
    rowEl.style.transform = `translateX(${currentCat * ICON_SPACING * -1}px)`;

    menuData.forEach((_, i) => {
        const grp = document.getElementById(`cat-${i}`);
        grp.classList.remove('hovered');

        if (i === currentCat) {
            grp.classList.add('active');
            grp.classList.remove('inactive');
            updateVertical(i);
        } else {
            grp.classList.remove('active');
            grp.classList.add('inactive');
        }
    });
}

function updateVertical(cIdx) {
    const col = document.getElementById(`col-${cIdx}`);
    const items = col.querySelectorAll('.item');

    items.forEach((item, i) => {
        item.classList.remove('hovered');
        if (i === currentItem) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    const scrollY = currentItem * ITEM_HEIGHT * -1;
    col.style.transform = `translateY(${scrollY}px)`;
}

function loadInIframe(itemName) {
    const path = itemToPath[itemName];
    if (!path) {
        console.log(`No path defined for: ${itemName}`);
        return;
    }

    const container = document.getElementById('iframe-container');
    const iframe = document.getElementById('content-iframe');

    iframe.src = path;
    container.classList.remove('hidden');
    document.body.classList.add('split-view');

    setTimeout(() => {
        container.classList.add('visible');
    }, 10);
}

function closeIframe() {
    const container = document.getElementById('iframe-container');
    const iframe = document.getElementById('content-iframe');

    container.classList.remove('visible');
    document.body.classList.remove('split-view');

    setTimeout(() => {
        container.classList.add('hidden');
        iframe.src = '';
    }, 400);
}

document.addEventListener('keydown', (e) => {
    if(e.key === 'ArrowRight') {
        if(currentCat < menuData.length - 1) {
            currentCat++;
            currentItem = 0;
            updatePos();
        }
    } else if(e.key === 'ArrowLeft') {
        if(currentCat > 0) {
            currentCat--;
            currentItem = 0;
            updatePos();
        }
    } else if(e.key === 'ArrowDown') {
        if(currentItem < menuData[currentCat].items.length - 1) {
            currentItem++;
            updatePos();
        }
    } else if(e.key === 'ArrowUp') {
        if(currentItem > 0) {
            currentItem--;
            updatePos();
        }
    } else if(e.key === 'Enter') {
        const itemName = menuData[currentCat].items[currentItem].name;
        loadInIframe(itemName);
    } else if(e.key === 'Escape') {
        closeIframe();
    }
});

// ==========================================
// PS3 XMB BACKGROUND ANIMATION LOGIC
// ==========================================
let canvas, ctx;
let width, height;
let waves = [];
let particles = [];
let tick = 0;

function initBackground() {
    canvas = document.getElementById('bg-canvas');
    ctx = canvas.getContext('2d');
    
    resize();
    window.addEventListener('resize', resize);
    
    // Create Waves (Layered for depth)
    // Args: y-offset, amplitude, frequency, speed, color
    waves.push(new Wave(0.5, 30, 0.005, 0.002, 'rgba(255, 255, 255, 0.1)'));
    waves.push(new Wave(0.5, 40, 0.004, 0.003, 'rgba(255, 255, 255, 0.15)'));
    
    // Create "Glitter" Particles
    for(let i = 0; i < 40; i++) {
        particles.push(new Particle());
    }

    animate();
}

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

class Wave {
    constructor(yPercent, amplitude, freq, speed, color) {
        this.yPercent = yPercent;
        this.amplitude = amplitude;
        this.freq = freq;
        this.speed = speed;
        this.color = color;
        this.phase = Math.random() * Math.PI * 2;
    }

    draw(ctx, time) {
        ctx.beginPath();
        const baseH = height * this.yPercent;
        
        // Draw the top sine curve
        for(let x = 0; x <= width; x += 5) {
            const y = baseH + Math.sin(x * this.freq + time * this.speed + this.phase) * this.amplitude;
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }

        // Draw the bottom sine curve (slightly offset to create ribbon)
        for(let x = width; x >= 0; x -= 5) {
            const y = baseH + Math.sin(x * this.freq + time * this.speed + this.phase + 1.5) * this.amplitude + 50; 
            ctx.lineTo(x, y);
        }

        ctx.fillStyle = this.color;
        ctx.closePath();
        ctx.fill();

        // Optional: Add a thin white stroke line on top
        ctx.beginPath();
        for(let x = 0; x <= width; x += 5) {
            const y = baseH + Math.sin(x * this.freq + time * this.speed + this.phase) * this.amplitude;
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = "rgba(255,255,255,0.1)";
        ctx.stroke();
    }
}

class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5; // Slow drift X
        this.vy = (Math.random() - 0.5) * 0.5; // Slow drift Y
        this.size = Math.random() * 2;
        this.alpha = Math.random() * 0.5;
        this.fade = (Math.random() * 0.01) + 0.005;
        this.fadingIn = true;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        // Fade in/out
        if (this.fadingIn) {
            this.alpha += this.fade;
            if (this.alpha >= 0.8) this.fadingIn = false;
        } else {
            this.alpha -= this.fade;
            if (this.alpha <= 0) this.reset();
        }

        // Wrap screen
        if(this.x > width) this.x = 0;
        if(this.x < 0) this.x = width;
        if(this.y > height) this.y = 0;
        if(this.y < 0) this.y = height;
    }

    draw(ctx) {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function animate() {
    ctx.clearRect(0, 0, width, height);
    tick += 1;

    // Draw Particles behind waves
    particles.forEach(p => {
        p.update();
        p.draw(ctx);
    });

    // Draw Waves
    waves.forEach(w => w.draw(ctx, tick));

    requestAnimationFrame(animate);
}

init();