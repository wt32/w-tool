# Tauri + Vue 3

This template should help get you started developing with Tauri + Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)

## 启动命令

```
cd tauri-app
npm install
npm run tauri dev
npm run tauri build
```

获取一个 pid 的所有子进程的 pid

```powershell
function Get-ChildProcesses {
    param(
        [int]$parentProcessId
    )

    # 获取直接子进程
    $childProcesses = Get-WmiObject -Query "SELECT * FROM Win32_Process WHERE ParentProcessId=$parentProcessId"

    # 存储所有子进程的数组
    $allChildProcesses = @()

    # 遍历直接子进程
    foreach ($process in $childProcesses) {
        # 添加当前子进程
        $allChildProcesses += $process.ProcessId

        # 递归获取更深层次的子进程
        $grandChildProcesses = Get-ChildProcesses -parentProcessId $process.ProcessId
        Write-Host "Child Process ID: $grandChildProcesses.ProcessId"
    }

    return $allChildProcesses
}

# 指定父进程ID
$parentProcessId = (Get-Process -Id 12060).Parent.ProcessId

# 调用函数并存储结果
$allChildProcessIds = Get-ChildProcesses -parentProcessId $parentProcessId

# 输出所有子进程的PID
$allChildProcessIds | ForEach-Object { Write-Host "Child Process ID: $_" }
```

```javascript
// 获取文件路径转换浏览器文件路径
import { convertFileSrc } from "@tauri-apps/api/tauri";
```
