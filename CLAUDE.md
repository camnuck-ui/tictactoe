# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A single-file browser-based Tic Tac Toe game. No build step, no dependencies, no package manager. Open `tictactoe.html` directly in a browser to run.

## Architecture

Everything lives in `tictactoe.html` — HTML structure, CSS, and JavaScript are all inline in one file. There is no bundler, framework, or external library.

**Key JS globals:**
- `board` — 9-element array (`null | 'X' | 'O'`) representing the grid by index 0–8
- `current` — whose turn it is (`'X'` or `'O'`)
- `over` — boolean, true once the game ends
- `scores` — `{ X, O, D }` object tracking wins and draws across games
- `WINS` — hardcoded array of all 8 winning index triplets

**Game flow:** `init()` resets state → clicks update `board[]` → `checkWin()` scans `WINS` → win/draw/continue branch updates DOM and `scores`.

## Git & GitHub

- Remote: `https://github.com/camnuck-ui/tictactoe`
- Always commit and push after meaningful changes so there is a saved version to revert to.
- Use descriptive commit messages that explain *what* changed and *why*.
