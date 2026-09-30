'use client'

import { useMemo, useState } from 'react'
import {
  Activity,
  ArrowUpRight,
  Check,
  ChevronRight,
  Cpu,
  FileText,
  Folder,
  FolderOpen,
  HardDrive,
  LockKeyhole,
  Menu,
  Play,
  Search,
  Settings2,
  ShieldCheck,
  Sparkles,
  Terminal,
  X,
} from 'lucide-react'

type Surface = 'COMMAND' | 'WORKSPACE' | 'TASKS' | 'ACTIVITY' | 'AGENTS' | 'MODELS' | 'REPORTS' | 'SYSTEM'
type TaskState = 'idle' | 'approval' | 'running' | 'complete'

const navItems: { label: Surface; icon: typeof Terminal }[] = [
  { label: 'COMMAND', icon: Terminal }, { label: 'WORKSPACE', icon: FolderOpen }, { label: 'TASKS', icon: Check },
  { label: 'ACTIVITY', icon: Activity }, { label: 'AGENTS', icon: Sparkles }, { label: 'MODELS', icon: Cpu },
  { label: 'REPORTS', icon: FileText }, { label: 'SYSTEM', icon: Settings2 },
]

const folders = [
  { name: 'OASIS', files: 24, tone: 'blue' }, { name: 'SHADOWFOX', files: 18, tone: 'red' },
  { name: 'IBM', files: 31, tone: 'yellow' }, { name: 'SYNENT', files: 12, tone: 'lavender' },
]
const events = [
  ['14:32:01', 'SYS', 'BLACKBOX STARTED'], ['14:32:02', 'OBSERVE', '/INTERNSHIPS'],
  ['14:32:03', 'SCAN', '42 FILES'], ['14:32:05', 'AI', 'LOCAL MODEL ACTIVE'],
  ['14:32:06', 'PLAN', '07 OPERATIONS'], ['14:32:07', 'AUTH', 'APPROVAL REQUIRED'],
]
const agents = [
  ['FILE AGENT', 'OBSERVE / UNDERSTAND / ORGANIZE / VERIFY', 'blue'], ['PLANNING AGENT', 'TRANSLATE INTENT INTO SAFE OPERATIONS', 'lavender'],
  ['RESEARCH AGENT', 'SEARCH LOCAL KNOWLEDGE WITHOUT UPLOADS', 'yellow'], ['EXECUTION AGENT', 'APPLY APPROVED CHANGES ON DEVICE', 'red'],
  ['VERIFICATION AGENT', 'CHECK RESULTS AGAINST THE PLAN', 'green'], ['REPORT AGENT', 'TURN COMPLETED WORK INTO EVIDENCE', 'paper'],
]

export function BlackboxCommandCenter() {
  const [activeNav, setActiveNav] = useState<Surface>('COMMAND')
  const [command, setCommand] = useState('')
  const [taskState, setTaskState] = useState<TaskState>('idle')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedFolder, setSelectedFolder] = useState('OASIS')
  const [selectedEvent, setSelectedEvent] = useState(0)
  const statusLabel = useMemo(() => ({ idle: 'READY', approval: 'APPROVAL REQUIRED', running: 'EXECUTING', complete: 'VERIFIED' })[taskState], [taskState])

  function startTask() { if (!command.trim()) return; setTaskState('approval') }
  function approveTask() { setTaskState('running'); window.setTimeout(() => setTaskState('complete'), 900) }

  return <div className="bb-shell">
    <header className="bb-topbar"><button className="bb-menu-button" aria-label="Toggle navigation" onClick={() => setSidebarOpen(!sidebarOpen)}><Menu /></button><div className="bb-brand"><span className="bb-mark"><span /></span><span>BLACKBOX</span></div><div className="bb-top-meta">LOCAL / CONTROLLED / AI-READY <b>{statusLabel}</b></div></header>
    <div className="bb-body">
      <aside className={`bb-sidebar ${sidebarOpen ? 'is-open' : ''}`}><div className="bb-side-label">BLACKBOX / CORE</div><nav aria-label="Main navigation">{navItems.map(({ label, icon: Icon }) => <button key={label} className={`bb-nav-item ${activeNav === label ? 'active' : ''}`} onClick={() => { setActiveNav(label); setSidebarOpen(false) }}><Icon /><span>{label}</span>{activeNav === label && <ChevronRight className="nav-arrow" />}</button>)}</nav><div className="bb-side-bottom"><div className="bb-side-label">SYSTEM STATUS</div><div className="bb-status-stack"><span><i className="status-dot" /> LOCAL</span><span><Check /> AUTHORIZED</span><span><LockKeyhole /> PRIVATE</span></div><div className="bb-version">SYS.01 / BUILD 0.1.0</div></div></aside>
      <main className="bb-main"><div className="bb-surface-head"><div><div className="eyebrow"><span className="eyebrow-line" /> BLACKBOX / {activeNav}</div><h1>{activeNav === 'COMMAND' ? <>YOUR MACHINE.<br /><em>YOUR DATA.</em></> : activeNav}</h1><p>{activeNav === 'COMMAND' ? 'PRIVATE INTELLIGENCE. ON YOUR MACHINE.' : 'A focused operating surface for local intelligence.'}</p></div><div className="surface-stamp">LOCAL<br /><strong>01</strong><br />AUTHORIZED</div></div>
        {activeNav === 'COMMAND' && <CommandSurface command={command} setCommand={setCommand} taskState={taskState} statusLabel={statusLabel} startTask={startTask} approveTask={approveTask} setTaskState={setTaskState} />}
        {activeNav === 'WORKSPACE' && <WorkspaceSurface selectedFolder={selectedFolder} setSelectedFolder={setSelectedFolder} />}
        {activeNav === 'TASKS' && <TasksSurface taskState={taskState} setActiveNav={setActiveNav} />}
        {activeNav === 'ACTIVITY' && <ActivitySurface selectedEvent={selectedEvent} setSelectedEvent={setSelectedEvent} />}
        {activeNav === 'AGENTS' && <AgentsSurface />}
        {activeNav === 'MODELS' && <ModelsSurface />}
        {activeNav === 'REPORTS' && <ReportsSurface taskState={taskState} />}
        {activeNav === 'SYSTEM' && <SystemSurface />}
      </main>
    </div><footer className="bb-footer"><span><Sparkles /> PRIVATE INTELLIGENCE. ON YOUR MACHINE.</span><span>LOCAL / CONTROLLED / YOURS</span></footer>
  </div>
}

function CommandSurface({ command, setCommand, taskState, statusLabel, startTask, approveTask, setTaskState }: { command: string; setCommand: (v: string) => void; taskState: TaskState; statusLabel: string; startTask: () => void; approveTask: () => void; setTaskState: (v: TaskState) => void }) {
  const steps = ['OBSERVE', 'UNDERSTAND', 'PLAN', 'APPROVE', 'EXECUTE', 'VERIFY', 'REPORT']; const activeUntil = taskState === 'approval' ? 3 : taskState === 'running' ? 5 : taskState === 'complete' ? 6 : -1
  return <><section className="command-layout"><div className="command-canvas"><div className="panel-heading"><span>COMMAND / INPUT</span><span className="mono-muted">LOCAL ONLY</span></div><label htmlFor="command">WHAT SHOULD BLACKBOX DO?</label><textarea id="command" value={command} onChange={e => setCommand(e.target.value)} placeholder="Organize my internship projects..." /><div className="command-suggestions"><span>TRY</span><button onClick={() => setCommand('Organize my internship projects and create a project index.')}>Organize projects</button><button onClick={() => setCommand('Find duplicate documents in my workspace.')}>Find duplicates</button></div><button className="execute-button" onClick={startTask} disabled={!command.trim() || taskState === 'running'}><Play /> {taskState === 'idle' ? 'GENERATE PLAN' : statusLabel}</button></div><div className="pipeline-panel"><div className="panel-heading"><span>OPERATION PIPELINE</span><span className="mono-muted">{statusLabel}</span></div>{steps.map((step, i) => <button className={`pipeline-step ${i <= activeUntil ? 'active' : ''}`} key={step}><b>0{i + 1}</b><span>{step}</span><small>{i === 3 && taskState === 'approval' ? 'WAITING' : i <= activeUntil ? 'DONE' : 'IDLE'}</small></button>)}</div></section>{taskState === 'approval' && <section className="approval-surface"><div><span className="warning-icon">!</span><div><div className="approval-kicker">ACTION PLAN / REVIEW REQUIRED</div><h2>APPROVE OPERATIONS</h2><p>BLACKBOX will make only the changes listed below.</p></div></div><div className="approval-actions"><button className="cancel-button" onClick={() => setTaskState('idle')}><X /> CANCEL</button><button className="approve-button" onClick={approveTask}><ShieldCheck /> APPROVE & EXECUTE</button></div><div className="operation-grid"><span><strong>04</strong>FOLDERS CREATED</span><span><strong>18</strong>FILES MOVED</span><span><strong>06</strong>FILES RENAMED</span><span><strong>01</strong>INDEX GENERATED</span></div></section>}{taskState === 'complete' && <section className="complete-surface"><Check /><div><div className="approval-kicker">TASK COMPLETE / VERIFIED</div><h2>WORKSPACE ORGANIZED</h2><p>18 operations completed with 0 errors.</p></div><button className="approve-button" onClick={() => { setTaskState('idle'); setCommand('') }}>NEW TASK <ArrowUpRight /></button></section>}<div className="command-strips"><div><div className="strip-label">CURRENT OPERATION</div><strong>OBSERVE → UNDERSTAND → PLAN → APPROVE → EXECUTE → VERIFY</strong></div><div className="metric-block"><b>42</b><span>FILES<br />INDEXED</span></div><div className="metric-block"><b>07</b><span>OPERATIONS<br />READY</span></div></div></>
}

function WorkspaceSurface({ selectedFolder, setSelectedFolder }: { selectedFolder: string; setSelectedFolder: (v: string) => void }) { return <section className="workspace-surface"><div className="breadcrumb">/ INTERNSHIPS / <strong>{selectedFolder}</strong><Search /></div><div className="folder-grid">{folders.map(folder => <button key={folder.name} className={`folder-module ${folder.tone} ${selectedFolder === folder.name ? 'selected' : ''}`} onClick={() => setSelectedFolder(folder.name)}><Folder /><strong>{folder.name}</strong><span>{folder.files} FILES</span><ArrowUpRight /></button>)}</div><div className="inspector"><div><div className="strip-label">SELECTED DIRECTORY</div><h2>{selectedFolder}</h2><p>Authorized local project directory. Click another folder to inspect its contents.</p></div><div className="inspector-stat"><b>{folders.find(f => f.name === selectedFolder)?.files}</b><span>FILES<br />LOCAL</span></div></div></section> }
function TasksSurface({ taskState, setActiveNav }: { taskState: TaskState; setActiveNav: (v: Surface) => void }) { return <section className="tasks-surface"><div className="task-detail"><div className="task-number">TASK_0042</div><h2>ORGANIZE INTERNSHIP PROJECTS</h2><p>Created today / LOCAL WORKSPACE</p>{['OBSERVE', 'UNDERSTAND', 'PLAN', 'APPROVE', 'EXECUTE', 'VERIFY', 'REPORT'].map((step, i) => <button className={`task-row ${i < (taskState === 'complete' ? 7 : 4) ? 'done' : ''}`} key={step}><span>0{i + 1}</span><strong>{step}</strong><b>{i < (taskState === 'complete' ? 7 : 4) ? '✓' : '○'}</b></button>)}</div><div className="task-queue"><div className="strip-label">TASK QUEUE</div><div className="queue-line active"><b>ACTIVE</b><span>1</span></div><div className="queue-line"><b>WAITING FOR APPROVAL</b><span>{taskState === 'approval' ? '1' : '0'}</span></div><div className="queue-line"><b>COMPLETED</b><span>{taskState === 'complete' ? '1' : '0'}</span></div><button className="outline-button" onClick={() => setActiveNav('COMMAND')}>OPEN COMMAND <ArrowUpRight /></button></div></section> }
function ActivitySurface({ selectedEvent, setSelectedEvent }: { selectedEvent: number; setSelectedEvent: (v: number) => void }) { return <section className="activity-surface"><div className="event-console">{events.map((event, i) => <button className={`event-row ${selectedEvent === i ? 'selected' : ''}`} key={event[0]} onClick={() => setSelectedEvent(i)}><span>{event[0]}</span><b>{event[1]}</b><strong>{event[2]}</strong></button>)}</div><div className="event-inspector"><div className="strip-label">EVENT DETAILS</div><h2>{events[selectedEvent][1]}</h2><p>{events[selectedEvent][2]}</p><div className="event-meta">TIMESTAMP <strong>{events[selectedEvent][0]}</strong><br />DATA ROUTE <strong>LOCAL ONLY</strong></div></div></section> }
function AgentsSurface() { return <section className="agent-grid">{agents.map(([name, detail, tone]) => <button className={`agent-module ${tone}`} key={name}><div className="agent-index">AGENT / 0{agents.findIndex(a => a[0] === name) + 1}</div><h2>{name}</h2><p>{detail}</p><ArrowUpRight /></button>)}</section> }
function ModelsSurface() { return <section className="model-board"><div className="model-main"><div className="strip-label">LOCAL AI / MODEL</div><h2>LOCAL MODEL</h2><p>BLACKBOX-CORE / READY</p><div className="model-route">PROMPT <ChevronRight /> ONNX <ChevronRight /> RESULT</div></div><div className="model-specs"><div><span>RUNTIME</span><strong>ONNX</strong></div><div><span>ACCELERATION</span><strong>NPU / GPU / CPU</strong></div><div><span>DATA ROUTE</span><strong>LOCAL</strong></div><div><span>DEVICE METRICS</span><strong>--</strong></div></div></section> }
function ReportsSurface({ taskState }: { taskState: TaskState }) { return <section className="report-sheet"><div className="report-top"><span>REPORT / TASK_0042</span><b>BUILD 0.1</b></div><h2>INTERNSHIP PROJECTS<br /><em>ORGANIZED</em></h2><div className="report-results"><div><b>{taskState === 'complete' ? '42' : '--'}</b><span>FILES ANALYZED</span></div><div><b>{taskState === 'complete' ? '07' : '--'}</b><span>OPERATIONS EXECUTED</span></div><div><b>{taskState === 'complete' ? '00' : '--'}</b><span>ERRORS</span></div></div><div className="report-verification"><span>VERIFICATION</span><strong>{taskState === 'complete' ? '✓ COMPLETE' : 'PENDING EXECUTION'}</strong><span>DATA ROUTE</span><strong>LOCAL ONLY</strong></div></section> }
function SystemSurface() { return <section className="system-board"><div className="system-title"><div className="strip-label">BLACKBOX SYSTEM</div><h2>TECHNICAL<br />INSTRUMENT PANEL</h2></div>{[['DEVICE', 'AI PC'], ['PROCESSING', 'LOCAL'], ['CLOUD TRANSMISSION', 'OFF'], ['AUTHORIZED DIRECTORIES', '03'], ['MODEL RUNTIME', 'LOCAL'], ['STATUS', 'OPERATIONAL']].map(([label, value]) => <div className="system-cell" key={label}><span>{label}</span><strong>{value}</strong></div>)}</section> }

export default BlackboxCommandCenter
