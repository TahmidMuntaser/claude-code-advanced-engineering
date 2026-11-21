# Todo List Application Test Plan

## Overview

This test plan covers comprehensive testing of a Todo List application, including normal scenarios, edge cases, and unexpected user inputs. The plan is organized into six major sections covering all application features.

---

## 1. Add Task

| Test Case ID | Feature | Test Scenario | Steps to Execute | Expected Result | Actual Result | Status |
|---|---|---|---|---|---|---|
| TC-ADD-001 | Add Task | Add a task with valid text | 1. Open the application<br>2. Enter "Buy groceries" in the input field<br>3. Press Enter | The task "Buy groceries" appears in the task list | | |
| TC-ADD-002 | Add Task | Add a task containing only spaces | 1. Enter only spaces (e.g., "   ") in the input field<br>2. Press Enter | No task is added; an error message appears indicating task cannot be empty | | |
| TC-ADD-003 | Add Task | Add an empty task | 1. Leave the input field blank<br>2. Press Enter | No task is added; focus returns to the input field | | |
| TC-ADD-004 | Add Task | Add a task with special characters, numbers, and emojis | 1. Enter "Task @#123 🎉" in the input field<br>2. Press Enter | The task "Task @#123 🎉" appears exactly as entered | | |
| TC-ADD-005 | Add Task | Add a task with very long text | 1. Enter a string exceeding 100 characters (e.g., "A".repeat(150))<br>2. Press Enter | The task is added and displays correctly, possibly truncated with ellipsis if UI limits length | | |
| TC-ADD-006 | Add Task | Add multiple tasks with the same name | 1. Add task "Buy milk"<br>2. Add task "Buy milk" again<br>3. Add task "Buy milk" a third time | All three tasks appear in the list with the same name; each can be individually selected/completed/deleted | | |
| TC-ADD-007 | Add Task | Add tasks using the Enter key | 1. Enter "Task A" and press Enter<br>2. Enter "Task B" and press Enter<br>3. Enter "Task C" and press Enter | Tasks A, B, and C appear in the list in that order; input field clears after each entry | | |

---

## 2. Update Task

| Test Case ID | Feature | Test Scenario | Steps to Execute | Expected Result | Actual Result | Status |
|---|---|---|---|---|---|---|
| TC-UPD-001 | Update Task | Edit an existing task | 1. Hover over or click the edit icon on an existing task<br>2. Modify the text<br>3. Save the changes | The task text is updated to the new text | | |
| TC-UPD-002 | Update Task | Save an edited task with valid text | 1. Edit task "Buy milk" to "Buy organic milk"<br>2. Save the changes | Task text changes from "Buy milk" to "Buy organic milk" | | |
| TC-UPD-003 | Update Task | Save an empty or whitespace-only task | 1. Edit task to remove all text (leave blank) or enter only spaces<br>2. Save the changes | No change is applied; original task text remains; error message may appear | | |
| TC-UPD-004 | Update Task | Cancel editing without changing the original task | 1. Begin editing a task<br>2. Click Cancel or Esc before saving | The task reverts to its original text; no changes are persisted | | |
| TC-UPD-005 | Update Task | Edit a task with special characters or very long text | 1. Edit a task to include special characters (e.g., "Task @#$%")<br>2. Or enter very long text<br>3. Save the changes | Task is saved with the special characters or long text, displaying correctly within UI constraints | | |

---

## 3. Delete Task

| Test Case ID | Feature | Test Scenario | Steps to Execute | Expected Result | Actual Result | Status |
|---|---|---|---|---|---|---|
| TC-DEL-001 | Delete Task | Delete an existing task | 1. Select a task<br>2. Click the delete button or press Delete key | The task is removed from the list | | |
| TC-DEL-002 | Delete Task | Delete the last remaining task | 1. Have one task in the list<br>3. Delete it | The list becomes empty; empty-state message is displayed | | |
| TC-DEL-003 | Delete Task | Delete one task when multiple tasks exist | 1. Add at least two tasks<br>2. Delete one of them | The selected task is removed; the other tasks remain in the list | | |
| TC-DEL-004 | Delete Task | Verify that deleting a task does not affect other tasks | 1. Add three tasks<br>2. Delete the middle task<br>3. Verify the first and last tasks are still present | Only the deleted task is removed; the other two tasks remain unchanged | | |

---

## 4. Complete Task

| Test Case ID | Feature | Test Scenario | Steps to Execute | Expected Result | Actual Result | Status |
|---|---|---|---|---|---|---|
| TC-CMP-001 | Complete Task | Mark a pending task as completed | 1. Have a pending task<br>2. Click the checkbox or mark as completed button | The task is visually marked as completed (e.g., strikethrough, color change) and moves to the completed section | | |
| TC-CMP-002 | Complete Task | Change a completed task back to pending | 1. Have a completed task<br>2. Click the checkbox again or mark as pending | The task status reverts to pending; visual formatting removes completion styling | | |
| TC-CMP-003 | Complete Task | Complete multiple tasks | 1. Have multiple pending tasks<br>2. Mark all of them as completed | All tasks are marked as completed; each retains its individual identity | | |
| TC-CMP-004 | Complete Task | Verify that the correct task status is updated | 1. Mark task A as completed<br>2. Verify task A shows as completed<br>3. Verify task B (untouched) remains pending | Only the intended task's status changes; other tasks are unaffected | | |

---

## 5. LocalStorage

| Test Case ID | Feature | Test Scenario | Steps to Execute | Expected Result | Actual Result | Status |
|---|---|---|---|---|---|---|
| TC-LS-001 | LocalStorage | Verify that tasks remain after refreshing the browser | 1. Add several tasks<br>2. Refresh the browser page | All tasks persist and are displayed after refresh | | |
| TC-LS-002 | LocalStorage | Verify that updated tasks are saved | 1. Edit an existing task<br>2. Refresh the browser page | The updated task text persists after refresh | | |
| TC-LS-003 | LocalStorage | Verify that deleted tasks remain deleted after refreshing | 1. Delete a task<br>2. Refresh the browser page | The deleted task does not reappear; list reflects the deletion | | |
| TC-LS-004 | LocalStorage | Verify that completed task statuses persist | 1. Complete a task<br>2. Refresh the browser page | The task remains marked as completed after refresh | | |
| TC-LS-005 | LocalStorage | Test behavior when localStorage is empty | 1. Open the application in a fresh session (no prior data)<br>2. Verify the task list is empty | The application starts with no tasks; empty-state message is displayed | | |
| TC-LS-006 | LocalStorage | Test behavior when localStorage contains invalid or corrupted data | 1. Corrupt the localStorage data (e.g., via developer tools)<br>2. Refresh the browser | The application handles corrupted data gracefully—either clears it and starts fresh or displays an error without crashing | | |

---

## 6. UI and User Experience

| Test Case ID | Feature | Test Scenario | Steps to Execute | Expected Result | Actual Result | Status |
|---|---|---|---|---|---|---|
| TC-UI-001 | UI and UX | Verify the empty-state message | 1. Open the application with no tasks | An empty-state message such as "No tasks yet" or "Add a task above" is displayed | | |
| TC-UI-002 | UI and UX | Verify that all action buttons work correctly | 1. Test Add, Edit, Delete, and Complete buttons | Each button performs its intended function without errors | | |
| TC-UI-003 | UI and UX | Check long task text and layout overflow | 1. Add a task with very long text<br>2. Verify the layout handles it gracefully | Long text wraps or truncates with ellipsis; layout does not break | | |
| TC-UI-004 | UI and UX | Test the application on desktop and mobile screen sizes | 1. Resize the browser window or use device toolbar<br>3. Test all functionalities on narrow and wide views | Interface adapts responsively; all controls remain accessible and usable | | |
| TC-UI-005 | UI and UX | Verify that the interface remains usable with many tasks | 1. Add 50+ tasks<br>2. Scroll, search, and perform actions | Interface remains performant; tasks are accessible; no significant slowdown or layout breakage | | |

---

## Instructions for Testers

- **Positive and negative test cases are included** for each feature.
- **Edge cases** that could cause unexpected behavior or application errors are prioritized.
- **Only features part of the Todo List application** are tested; unrelated features are excluded.
- Test cases are organized into **clearly separated sections** by feature.
- **Markdown tables** are used for structured data presentation.
- Test cases are **specific enough** that another person or AI agent can execute them without guessing.

---

Generated with [Claude Code](https://claude.com/claude-code)