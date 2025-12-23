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

// File path mapping for visualization HTML files
const itemToPath = {
    // System
    "About GSU DSA": "system/about.html",
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
let currentItem = 0; // Start at Stack (first item)

const rowEl = document.getElementById('category-row');

// UPDATED JS CONSTANTS to match CSS variables
const ICON_SPACING = 200;
const ITEM_HEIGHT = 80;

function init() {
    render();
    updatePos();
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
        // Add Font Awesome icon to category
        icon.innerHTML = `<i class="${cat.icon}" style="font-size: 48px; color: #0039A6;"></i>`;
        // Click on category icon to navigate to that category
        icon.addEventListener('click', () => {
            currentCat = cIdx;
            currentItem = 0;
            updatePos();
        });

        // Add hover listeners for non-active categories
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
            // Use Font Awesome icons instead of square icons
            item.innerHTML = `<i class="${itemObj.icon} item-fa-icon"></i><span>${itemObj.name}</span>`;
            // Click on menu item to select it and load in iframe
            item.addEventListener('click', () => {
                if (currentCat === cIdx) {
                    currentItem = iIdx;
                    updatePos();
                    // Load the clicked item in iframe
                    loadInIframe(itemObj.name);
                } else {
                    // If clicking an item from a different category, switch to that category first
                    currentCat = cIdx;
                    currentItem = iIdx;
                    updatePos();
                    // Load the clicked item in iframe
                    loadInIframe(itemObj.name);
                }
            });
            // Add hover listeners for items in active category
            item.addEventListener('mouseenter', () => {
                // Only apply hover if this item is not currently active
                if (cIdx === currentCat && iIdx !== currentItem) {
                    item.classList.add('hovered');
                }
            });

            item.addEventListener('mouseleave', () => {
                // Remove hover state when mouse leaves
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
    // Horizontal Scroll
    rowEl.style.transform = `translateX(${currentCat * ICON_SPACING * -1}px)`;

    // Category Classes
    menuData.forEach((_, i) => {
        const grp = document.getElementById(`cat-${i}`);

        // Clean up hover state on all categories
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
        // Clean up hover state on all items when navigation changes
        item.classList.remove('hovered');

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
        const itemName = menuData[currentCat].items[currentItem].name;
        loadInIframe(itemName);
    } else if(e.key === 'Escape') {
        // Close iframe
        closeIframe();
    }
});

init();
