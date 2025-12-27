# UI Inconsistencies in /structures/

## Heading Size Inconsistencies

### Main Page Headings (h1)
- **All files consistent**: 24px font-size
  - stack.html:92-97
  - queue.html:93-98
  - binary-tree.html:94-99
  - avl-tree.html:94-99
  - dijkstras-algorithm.html:87-92
  - hash-table.html:95-100

### Modal/Dialog Headings
**Inconsistency Found**: Different heading elements and sizes used across modals

1. **avl-tree.html:339-348**
   - Uses `<h2>` with font-size: **22px**
   - Context: Disclaimer modal header

2. **binary-tree.html:457-465**
   - Uses `.modal-header` class with font-size: **18px**
   - Context: Info modal header

3. **hash-table.html:304**
   - Uses `<h3>` with inline style
   - Context: Weight input modal
   - No explicit font-size set, likely defaults to browser default (~17-18px)

**Recommendation**: Standardize modal headings to a single size (suggest 20px or 22px) and consistent element type.

---

## Panel Title Inconsistencies

### Bottom Panel Labels
**Inconsistency Found**: Different font sizes and styling approaches

1. **binary-tree.html:554**
   - Inline style: `font-size: 12px`
   - Color: `var(--text-muted)`
   - Text-transform: `uppercase`
   - Letter-spacing: `1px`

2. **dijkstras-algorithm.html:284**
   - Inline style with `font-size:12px`
   - Different padding: `10px 20px` vs standard `15px 20px`

3. **hash-table.html:452**
   - Uses separate header elements
   - Has subtitle with `font-size: 11px` and `opacity: 0.6`

**Recommendation**: Create a consistent `.panel-title` class with standardized spacing and typography.

---

## Legend Item Styling

### Legend Text Size
**Generally Consistent**: Most use font-size: 12px

**Minor Variation Found**:
- hash-table.html has additional `.hash-info` with font-size: **13px** (line 240)
- Most other legends use 12px consistently

---

## Button and Control Inconsistencies

### Modal Close Buttons
**Inconsistency Found**: Different styling approaches

1. **avl-tree.html:379-397**
   - `.close-btn` with padding: `12px 32px`
   - Font-size: **14px**

2. **binary-tree.html:479-487**
   - `.modal-close-btn` with padding: `10px 24px`
   - No explicit font-size (inherits button default of 13px)

**Recommendation**: Unify modal button styling with consistent padding and font-size.

---

## Trace/Log Header Inconsistencies

### Log Panel Headers
**Inconsistency Found**: Different header structures

1. **binary-tree.html:382-385**
   - Simple text header with font-size: **14px**
   - Single purpose: "Operation Trace"

2. **hash-table.html:451-454**
   - Header with two spans (title + subtitle)
   - Main title: **14px**, subtitle: **11px** with opacity

**Recommendation**: Decide on single vs. dual-line header format and apply consistently.

---

## Array/Stats Display Inconsistencies

### Array Index Labels
**Mostly Consistent**: font-size: 10-11px

**Variation Found**:
- binary-tree.html:338 - `.array-cell span.idx`: **10px**
- stack.html:293 - `.array-cell span.idx`: **11px**
- queue.html:283 - `.array-cell span.idx`: **11px**

### Stats Cards (AVL Tree specific)
- avl-tree.html has unique `.stat-val` at **24px** and `.stat-label` at **12px**
- This component doesn't exist in other files
- Acceptable as unique to AVL tree's specific needs

---

## Additional Minor Inconsistencies

### Status Messages
**Generally Consistent**: All use similar positioning and font-size: 14px

### Disclaimer/Modal Content
1. **avl-tree.html:351-355**
   - Modal paragraph text: font-size: **15px**
   - Line-height: **1.7**

2. **binary-tree.html:467-474**
   - Modal paragraph text: font-size: **14px**
   - Line-height: **1.6**

**Recommendation**: Standardize modal body text to 14px with line-height: 1.6

---

## Summary

**Major Issues**:
1. Modal heading sizes vary (18px, 22px, default)
2. Panel title styling approaches differ
3. Modal button styling inconsistent
4. Modal body text size varies (14px vs 15px)

**Minor Issues**:
1. Array index label sizes vary slightly (10px vs 11px)
2. Log header formats differ in structure
3. Minor padding/spacing variations

**Recommended Actions**:
1. Create unified modal component styles
2. Standardize panel title class
3. Unify button padding and font-sizes
4. Normalize modal content typography
5. Standardize array/cell index label sizes to single value
