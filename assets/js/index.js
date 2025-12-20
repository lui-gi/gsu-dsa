const menuData = [
    {
        name: "System",
        items: ["About GSU DSA", "Credits (Dr. Islam)", "Source Code"]
    },
    {
        name: "Linear Structures",
        items: ["Stack", "Queue", "Singly Linked List", "Doubly Linked List"]
    },
    {
        name: "Key-Value Stores",
        items: ["Dictionary", "Hash Table"]
    },
    {
        name: "Trees",
        items: ["Binary Tree", "Heap", "AVL Tree", "Trie"]
    },
    {
        name: "Graphs & Algorithms",
        items: ["Graph Representation", "Topological Sort", "Dijkstra's Algorithm"]
    }
];

// File path mapping for visualization HTML files
const itemToPath = {
    // Linear Structures
    "Stack": "structures/linear-structures/stack.html",
    "Queue": "structures/linear-structures/queue.html",
    "Singly Linked List": "structures/linear-structures/singly-linked-list.html",
    "Doubly Linked List": "structures/linear-structures/doubly-linked-list.html",

    // Key-Value Stores
    "Dictionary": "structures/key-value-stores/dictionary.html",
    "Hash Table": "structures/key-value-stores/hash-table.html",

    // Trees
    "Binary Tree": "structures/trees/binary-tree.html",
    "Heap": "structures/trees/heap.html",
    "AVL Tree": "structures/trees/avl-tree.html",
    "Trie": "structures/trees/trie.html",

    // Graphs & Algorithms
    "Graph Representation": "structures/graphs-and-algorithms/graph-representation.html",
    "Topological Sort": "structures/graphs-and-algorithms/topological-sort.html",
    "Dijkstra's Algorithm": "structures/graphs-and-algorithms/dijkstras-algorithm.html"
};

let currentCat = 1; // Start at Linear Structures
let currentItem = 1; // Start at Queue

const rowEl = document.getElementById('category-row');

// UPDATED JS CONSTANTS to match CSS variables
const ICON_SPACING = 200;
const ITEM_HEIGHT = 80;

function init() {
    render();
    // updateClock();  // Removed - no longer using dynamic clock
    updatePos();
    // setInterval(updateClock, 60000);  // Removed - no longer using dynamic clock
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
        // Click on category icon to navigate to that category
        icon.addEventListener('click', () => {
            currentCat = cIdx;
            currentItem = 0;
            updatePos();
        });

        const col = document.createElement('div');
        col.className = 'item-col';
        col.id = `col-${cIdx}`;

        cat.items.forEach((txt, iIdx) => {
            const item = document.createElement('div');
            item.className = 'item';
            item.style.cursor = 'pointer';
            // We use innerHTML to insert the square icon and text
            item.innerHTML = `<div class="item-icon"></div><span>${txt}</span>`;
            // Click on menu item to select it and load in iframe
            item.addEventListener('click', () => {
                if (currentCat === cIdx) {
                    currentItem = iIdx;
                    updatePos();
                    // Load the clicked item in iframe
                    loadInIframe(txt);
                } else {
                    // If clicking an item from a different category, switch to that category first
                    currentCat = cIdx;
                    currentItem = iIdx;
                    updatePos();
                    // Load the clicked item in iframe
                    loadInIframe(txt);
                }
            });
            col.appendChild(item);
        });

        group.append(label, icon, col);
        rowEl.appendChild(group);
    });
}

function updatePos() {
    // Horizontal Scroll
    rowEl.style.transform = `translateX(${currentCat * ICON_SPACING * -1}px)`;

    // Category Classes
    menuData.forEach((_, i) => {
        const grp = document.getElementById(`cat-${i}`);
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
        if (i === currentItem) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    // Vertical Scroll Calculation
    const scrollY = currentItem * ITEM_HEIGHT * -1;
    col.style.transform = `translateY(${scrollY}px)`;
}

// function updateClock() {
//     const now = new Date();
//     const str = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//     document.getElementById('clock').innerText = str;
// }

// Iframe load and close functions
function loadInIframe(itemName) {
    const path = itemToPath[itemName];
    if (!path) {
        // System items don't have paths - ignore for now
        console.log(`No path defined for: ${itemName}`);
        return;
    }

    const container = document.getElementById('iframe-container');
    const iframe = document.getElementById('content-iframe');

    // Load the content
    iframe.src = path;

    // Show iframe with animation
    container.classList.remove('hidden');
    // Add split-view class to body to compress menu
    document.body.classList.add('split-view');

    // Trigger animation after display change
    setTimeout(() => {
        container.classList.add('visible');
    }, 10);
}

function closeIframe() {
    const container = document.getElementById('iframe-container');
    const iframe = document.getElementById('content-iframe');

    // Hide iframe with animation
    container.classList.remove('visible');
    document.body.classList.remove('split-view');

    // Clear iframe src after animation completes
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
        // Load the current item in iframe
        const itemName = menuData[currentCat].items[currentItem];
        loadInIframe(itemName);
    } else if(e.key === 'Escape') {
        // Close iframe
        closeIframe();
    }
});

init();
