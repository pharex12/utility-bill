import { useState, useEffect, useContext, createContext } from "react";
import {
  AreaChart, Area, BarChart, Bar, PieChart as RPieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";
import {
  Home, Zap, Droplets, Wifi, Tv, CreditCard, History,
  User, Settings, LogOut, Menu, X, Bell, Search,
  ChevronRight, ArrowUpRight, ArrowDownLeft, TrendingUp,
  Wallet, Shield, Clock, CheckCircle, AlertCircle, XCircle,
  Download, Eye, EyeOff, BarChart2, Users, ChevronDown,
  Mail, Lock, Loader2, Moon, Sun, Activity, Edit2, Banknote,
  Star, MapPin, Send, Phone, Check
} from "lucide-react";

// ─── STYLES ───────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#060D1A;--surf:#0B1527;--card:#0F1D34;--card2:#122040;
  --bdr:#1A3258;--bdr2:#243D63;
  --pri:#06B6D4;--pri-d:#0891B2;--pri-g:rgba(6,182,212,.15);--pri-g2:rgba(6,182,212,.25);
  --vio:#8B5CF6;--vio-g:rgba(139,92,246,.15);
  --ok:#10B981;--ok-g:rgba(16,185,129,.15);
  --warn:#F59E0B;--warn-g:rgba(245,158,11,.15);
  --err:#EF4444;--err-g:rgba(239,68,68,.15);
  --t1:#F0F6FF;--t2:#94A3B8;--t3:#5A7499;
  --r:12px;--r2:16px;--r3:20px;
  --sh:0 4px 24px rgba(0,0,0,.4);
  --tr:.2s cubic-bezier(.4,0,.2,1);
}
.light{
  --bg:#F0F4F8;--surf:#fff;--card:#fff;--card2:#F8FAFC;
  --bdr:#E2E8F0;--bdr2:#CBD5E1;--t1:#0F172A;--t2:#475569;--t3:#94A3B8;
  --sh:0 4px 24px rgba(0,0,0,.08);--pri-g:rgba(6,182,212,.1);
}
body{background:var(--bg);color:var(--t1);font-family:'DM Sans',sans-serif;line-height:1.6}
h1,h2,h3,h4{font-family:'Syne',sans-serif;line-height:1.25}
::-webkit-scrollbar{width:5px;height:5px}
::-webkit-scrollbar-track{background:var(--surf)}
::-webkit-scrollbar-thumb{background:var(--bdr2);border-radius:3px}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:7px;padding:9px 18px;border-radius:var(--r);border:none;cursor:pointer;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:500;transition:all var(--tr);text-decoration:none;white-space:nowrap}
.btn-pri{background:linear-gradient(135deg,var(--pri),var(--pri-d));color:#000;box-shadow:0 4px 14px var(--pri-g2)}
.btn-pri:hover{transform:translateY(-1px);box-shadow:0 6px 20px var(--pri-g2)}
.btn-ghost{background:transparent;color:var(--t2)}
.btn-ghost:hover{background:var(--card2);color:var(--t1)}
.btn-out{background:transparent;color:var(--pri);border:1px solid var(--bdr)}
.btn-out:hover{background:var(--pri-g);border-color:var(--pri)}
.btn-danger{background:var(--err-g);color:var(--err);border:1px solid rgba(239,68,68,.3)}
.btn-danger:hover{background:rgba(239,68,68,.25)}
.btn-sm{padding:6px 14px;font-size:13px}
.btn-lg{padding:13px 28px;font-size:16px;border-radius:var(--r2)}
.btn:disabled{opacity:.5;cursor:not-allowed;transform:none!important}
.card{background:var(--card);border:1px solid var(--bdr);border-radius:var(--r2);padding:22px;box-shadow:var(--sh)}
.inp{width:100%;background:var(--surf);border:1px solid var(--bdr);border-radius:var(--r);padding:11px 15px;color:var(--t1);font-family:'DM Sans',sans-serif;font-size:14px;transition:border-color var(--tr),box-shadow var(--tr);outline:none}
.inp:focus{border-color:var(--pri);box-shadow:0 0 0 3px var(--pri-g)}
.inp::placeholder{color:var(--t3)}
.inp-err{border-color:var(--err)}
.inp-err:focus{box-shadow:0 0 0 3px var(--err-g)}
.sel{width:100%;background:var(--surf);border:1px solid var(--bdr);border-radius:var(--r);padding:11px 15px;color:var(--t1);font-family:'DM Sans',sans-serif;font-size:14px;outline:none;appearance:none;cursor:pointer;transition:border-color var(--tr)}
.sel:focus{border-color:var(--pri);box-shadow:0 0 0 3px var(--pri-g)}
.badge{display:inline-flex;align-items:center;gap:4px;padding:3px 10px;border-radius:99px;font-size:12px;font-weight:500}
.b-ok{background:var(--ok-g);color:var(--ok)}
.b-warn{background:var(--warn-g);color:var(--warn)}
.b-err{background:var(--err-g);color:var(--err)}
.b-info{background:var(--pri-g);color:var(--pri)}
.b-vio{background:var(--vio-g);color:var(--vio)}
.sidebar{position:fixed;top:0;left:0;height:100vh;width:256px;background:var(--surf);border-right:1px solid var(--bdr);display:flex;flex-direction:column;z-index:100;transition:transform var(--tr)}
.mcontent{margin-left:256px;min-height:100vh;transition:margin var(--tr)}
@media(max-width:768px){
  .sidebar{transform:translateX(-100%)}
  .sidebar.open{transform:translateX(0);box-shadow:4px 0 30px rgba(0,0,0,.5)}
  .mcontent{margin-left:0!important}
  .hide-mob{display:none!important}
  .grid-4{grid-template-columns:repeat(2,1fr)!important}
  .grid-3{grid-template-columns:repeat(2,1fr)!important}
}
@media(max-width:540px){
  .grid-4,.grid-3,.grid-2{grid-template-columns:1fr!important}
  .card{padding:14px}
}
.nav-i{display:flex;align-items:center;gap:11px;padding:10px 14px;border-radius:var(--r);color:var(--t2);cursor:pointer;transition:all var(--tr);font-size:14px;font-weight:500;margin:2px 0}
.nav-i:hover{background:var(--card);color:var(--t1)}
.nav-i.act{background:var(--pri-g);color:var(--pri)}
.scard{background:var(--card);border:1px solid var(--bdr);border-radius:var(--r2);padding:18px;transition:all var(--tr)}
.scard:hover{border-color:var(--bdr2);transform:translateY(-2px);box-shadow:var(--sh)}
.toast-wrap{position:fixed;top:18px;right:18px;z-index:1000;display:flex;flex-direction:column;gap:9px}
.toast{display:flex;align-items:center;gap:11px;padding:13px 16px;background:var(--card);border:1px solid var(--bdr);border-radius:var(--r);box-shadow:var(--sh);min-width:270px;max-width:360px;animation:tIn .3s ease}
@keyframes tIn{from{transform:translateX(110%);opacity:0}to{transform:translateX(0);opacity:1}}
.t-ok{border-left:3px solid var(--ok)}
.t-err{border-left:3px solid var(--err)}
.t-warn{border-left:3px solid var(--warn)}
.t-info{border-left:3px solid var(--pri)}
.overlay{position:fixed;inset:0;background:rgba(0,0,0,.65);display:flex;align-items:center;justify-content:center;z-index:200;padding:20px;backdrop-filter:blur(4px);animation:fIn .2s ease}
.modal{background:var(--surf);border:1px solid var(--bdr);border-radius:var(--r3);padding:30px;max-width:480px;width:100%;animation:sIn .2s ease}
@keyframes fIn{from{opacity:0}to{opacity:1}}
@keyframes sIn{from{transform:scale(.95);opacity:0}to{transform:scale(1);opacity:1}}
.spin{animation:rot 1s linear infinite}
@keyframes rot{to{transform:rotate(360deg)}}
.gt{background:linear-gradient(135deg,var(--pri),var(--vio));-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.hero-bg{background:radial-gradient(ellipse at 50% 0%,rgba(6,182,212,.15) 0%,transparent 60%),radial-gradient(ellipse at 80% 50%,rgba(139,92,246,.1) 0%,transparent 50%)}
.pdot{width:8px;height:8px;border-radius:50%;background:var(--ok);box-shadow:0 0 0 0 rgba(16,185,129,.5);animation:pulse 2s infinite}
@keyframes pulse{0%{box-shadow:0 0 0 0 rgba(16,185,129,.5)}70%{box-shadow:0 0 0 8px rgba(16,185,129,0)}100%{box-shadow:0 0 0 0 rgba(16,185,129,0)}}
.page{animation:pIn .25s ease}
@keyframes pIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
.tag{display:inline-flex;align-items:center;padding:4px 12px;border-radius:99px;font-size:12px;font-weight:500;background:var(--card2);color:var(--t2);border:1px solid var(--bdr);cursor:pointer;transition:all var(--tr)}
.tag:hover,.tag.on{background:var(--pri-g);color:var(--pri);border-color:var(--pri)}
.grid-2{display:grid;grid-template-columns:repeat(2,1fr);gap:18px}
.grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
.grid-4{display:grid;grid-template-columns:repeat(4,1fr);gap:18px}
.tr-row{padding:13px 20px;border-bottom:1px solid var(--bdr);display:flex;align-items:center;gap:14px;transition:background var(--tr)}
.tr-row:hover{background:var(--card2)}
textarea.inp{resize:vertical;min-height:110px}
`;

// ─── MOCK DATA ─────────────────────────────────────────────────
const gid = () => Math.random().toString(36).substr(2,9).toUpperCase();

const PROVIDERS = {
  electricity:[{id:'ekedc',name:'Eko Electricity'},{id:'ikedc',name:'Ikeja Electric'},{id:'aedc',name:'Abuja Electricity'},{id:'phedc',name:'Port Harcourt Elec.'}],
  water:[{id:'lwsc',name:'Lagos Water Corp'},{id:'fcda',name:'FCDA Water Board'},{id:'enugu',name:'Enugu Water Auth.'}],
  internet:[{id:'mtn',name:'MTN Broadband'},{id:'airtel',name:'Airtel Internet'},{id:'glo',name:'Glo Broadband'},{id:'smile',name:'Smile 4G LTE'}],
  cable:[{id:'dstv',name:'DStv'},{id:'gotv',name:'GOtv'},{id:'startimes',name:'StarTimes'}],
};

const SERVICES = [
  {id:'electricity',name:'Electricity',icon:Zap,color:'#F59E0B',desc:'Pay electricity bills instantly'},
  {id:'water',name:'Water',icon:Droplets,color:'#06B6D4',desc:'Water board payments'},
  {id:'internet',name:'Internet',icon:Wifi,color:'#8B5CF6',desc:'Broadband subscriptions'},
  {id:'cable',name:'Cable TV',icon:Tv,color:'#EC4899',desc:'TV subscription renewals'},
];

const INIT_TXNS = [
  {id:'T001',type:'debit',service:'electricity',provider:'Eko Electricity',amount:5000,status:'success',date:'2025-05-20',ref:gid(),acct:'MTR-12345678'},
  {id:'T002',type:'debit',service:'water',provider:'Lagos Water Corp',amount:2500,status:'success',date:'2025-05-18',ref:gid(),acct:'CUS-87654321'},
  {id:'T003',type:'credit',service:'wallet',provider:'Bank Transfer',amount:20000,status:'success',date:'2025-05-17',ref:gid(),acct:'Top-up'},
  {id:'T004',type:'debit',service:'internet',provider:'MTN Broadband',amount:3000,status:'failed',date:'2025-05-15',ref:gid(),acct:'ACC-98765432'},
  {id:'T005',type:'debit',service:'cable',provider:'DStv',amount:8900,status:'success',date:'2025-05-12',ref:gid(),acct:'IUC-11223344'},
  {id:'T006',type:'debit',service:'electricity',provider:'Ikeja Electric',amount:6500,status:'pending',date:'2025-05-10',ref:gid(),acct:'MTR-55667788'},
  {id:'T007',type:'credit',service:'wallet',provider:'Card Payment',amount:15000,status:'success',date:'2025-05-08',ref:gid(),acct:'Top-up'},
  {id:'T008',type:'debit',service:'water',provider:'FCDA Water Board',amount:1800,status:'success',date:'2025-05-05',ref:gid(),acct:'CUS-44332211'},
  {id:'T009',type:'debit',service:'internet',provider:'Airtel Internet',amount:4500,status:'success',date:'2025-05-02',ref:gid(),acct:'ACC-22334455'},
  {id:'T010',type:'debit',service:'cable',provider:'GOtv',amount:3600,status:'success',date:'2025-04-28',ref:gid(),acct:'IUC-99887766'},
  {id:'T011',type:'credit',service:'wallet',provider:'Bank Transfer',amount:10000,status:'success',date:'2025-04-25',ref:gid(),acct:'Top-up'},
  {id:'T012',type:'debit',service:'electricity',provider:'Abuja Electricity',amount:7200,status:'success',date:'2025-04-22',ref:gid(),acct:'MTR-33445566'},
];

const CHART_DATA = [
  {m:'Jan',electricity:4200,water:1800,internet:3000,cable:4500},
  {m:'Feb',electricity:5100,water:2100,internet:3200,cable:4500},
  {m:'Mar',electricity:4800,water:1950,internet:4500,cable:4500},
  {m:'Apr',electricity:6200,water:2400,internet:3000,cable:8900},
  {m:'May',electricity:5000,water:2500,internet:3000,cable:8900},
];

const ADMIN_USERS = [
  {id:1,name:'John Adebayo',email:'john@example.com',status:'active',txns:24,spent:85000},
  {id:2,name:'Amaka Okonkwo',email:'amaka@example.com',status:'active',txns:18,spent:62000},
  {id:3,name:'Chukwu Emeka',email:'emeka@example.com',status:'inactive',txns:6,spent:18500},
  {id:4,name:'Fatima Hassan',email:'fatima@example.com',status:'active',txns:31,spent:105000},
  {id:5,name:'David Olatunji',email:'david@example.com',status:'active',txns:12,spent:41000},
];

const MOCK_USERS = {
  'user@utilpay.com':{id:'U001',name:'Alex Johnson',email:'user@utilpay.com',password:'user123',phone:'+234 801 234 5678',address:'Lagos, Nigeria',role:'user',walletBalance:48250},
  'admin@utilpay.com':{id:'A001',name:'Admin User',email:'admin@utilpay.com',password:'admin123',phone:'+234 802 345 6789',address:'Abuja, Nigeria',role:'admin',walletBalance:250000},
};

// ─── CONTEXT ───────────────────────────────────────────────────
const AppCtx = createContext();
const AuthCtx = createContext();

function AppProvider({children}){
  const [theme,setTheme] = useState('dark');
  const [toasts,setToasts] = useState([]);
  const [modal,setModal] = useState(null);
  const [txns,setTxns] = useState(INIT_TXNS);
  const toggleTheme = ()=>setTheme(t=>t==='dark'?'light':'dark');
  const toast = (msg,type='info',dur=3500)=>{
    const id=Date.now();
    setToasts(t=>[...t,{id,msg,type}]);
    setTimeout(()=>setToasts(t=>t.filter(x=>x.id!==id)),dur);
  };
  const rmToast = id=>setToasts(t=>t.filter(x=>x.id!==id));
  const addTxn = txn=>setTxns(p=>[{...txn,id:`T${String(p.length+1).padStart(3,'0')}`},...p]);
  return <AppCtx.Provider value={{theme,toggleTheme,toasts,toast,rmToast,modal,setModal,txns,addTxn}}>{children}</AppCtx.Provider>;
}

function AuthProvider({children}){
  const [user,setUser] = useState(null);
  const [loading,setLoading] = useState(false);
  const login = async(email,pw)=>{
    setLoading(true);
    await new Promise(r=>setTimeout(r,1100));
    const found = MOCK_USERS[email.toLowerCase()];
    setLoading(false);
    if(found&&found.password===pw){const{password:_,...u}=found;setUser(u);return{ok:true,user:u};}
    return{ok:false,err:'Invalid email or password'};
  };
  const register = async(data)=>{
    setLoading(true);
    await new Promise(r=>setTimeout(r,1300));
    setLoading(false);
    const{password:_,...u}={...data,id:gid(),role:'user',walletBalance:0};
    setUser(u);return{ok:true};
  };
  const logout = ()=>setUser(null);
  const update = d=>setUser(u=>({...u,...d}));
  return <AuthCtx.Provider value={{user,loading,login,register,logout,update}}>{children}</AuthCtx.Provider>;
}

const useApp = ()=>useContext(AppCtx);
const useAuth = ()=>useContext(AuthCtx);

// ─── UTILS ─────────────────────────────────────────────────────
const fc = n=>`₦${Number(n).toLocaleString()}`;
const fd = s=>new Date(s).toLocaleDateString('en-NG',{day:'numeric',month:'short',year:'numeric'});
const sbadge = s=>({success:'b-ok',failed:'b-err',pending:'b-warn'}[s]||'b-info');
const svc2icon = s=>({electricity:Zap,water:Droplets,internet:Wifi,cable:Tv,wallet:Wallet}[s]||CreditCard);
const svc2color = s=>({electricity:'#F59E0B',water:'#06B6D4',internet:'#8B5CF6',cable:'#EC4899',wallet:'#10B981'}[s]||'#94A3B8');

// ─── UI PRIMITIVES ─────────────────────────────────────────────
function GStyles(){return <style dangerouslySetInnerHTML={{__html:CSS}}/>;}

function Toasts(){
  const{toasts,rmToast}=useApp();
  const icons={success:CheckCircle,error:XCircle,warning:AlertCircle,info:Bell};
  const cols={success:'var(--ok)',error:'var(--err)',warning:'var(--warn)',info:'var(--pri)'};
  return(
    <div className="toast-wrap">
      {toasts.map(t=>{const I=icons[t.type]||Bell;return(
        <div key={t.id} className={`toast t-${t.type}`}>
          <I size={17} style={{color:cols[t.type],flexShrink:0}}/>
          <span style={{fontSize:13,flex:1}}>{t.msg}</span>
          <button onClick={()=>rmToast(t.id)} className="btn btn-ghost btn-sm" style={{padding:'2px 6px'}}><X size={13}/></button>
        </div>
      );})}
    </div>
  );
}

function Modal(){
  const{modal,setModal}=useApp();
  if(!modal)return null;
  return(
    <div className="overlay" onClick={e=>e.target===e.currentTarget&&setModal(null)}>
      <div className="modal">
        {modal.title&&<div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:20}}>
          <h3 style={{fontSize:19,fontWeight:700}}>{modal.title}</h3>
          <button className="btn btn-ghost btn-sm" style={{padding:6}} onClick={()=>setModal(null)}><X size={17}/></button>
        </div>}
        {modal.content}
      </div>
    </div>
  );
}

function Avi({user,size=40}){
  const ini=(user?.name||'??').split(' ').map(n=>n[0]).join('').toUpperCase().slice(0,2);
  return(
    <div style={{width:size,height:size,borderRadius:'50%',background:'linear-gradient(135deg,var(--pri),var(--vio))',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontWeight:700,fontSize:size*.36,fontFamily:'Syne',flexShrink:0}}>
      {ini}
    </div>
  );
}

function SvcIcon({svc,size=36}){
  const I=svc2icon(svc),c=svc2color(svc);
  return(
    <div style={{width:size,height:size,borderRadius:10,background:`${c}20`,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
      <I size={size*.5} style={{color:c}}/>
    </div>
  );
}

function StatCard({title,value,icon:I,color,change,up}){
  return(
    <div className="scard">
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:14}}>
        <div style={{width:42,height:42,borderRadius:11,background:`${color}20`,display:'flex',alignItems:'center',justifyContent:'center'}}>
          <I size={19} style={{color}}/>
        </div>
        {change&&<span style={{fontSize:12,fontWeight:500,color:up?'var(--ok)':'var(--err)',display:'flex',alignItems:'center',gap:3}}><TrendingUp size={13}/>{change}</span>}
      </div>
      <div style={{fontSize:22,fontWeight:700,fontFamily:'Syne',marginBottom:3}}>{value}</div>
      <div style={{fontSize:12,color:'var(--t2)'}}>{title}</div>
    </div>
  );
}

function TxnRow({t,compact}){
  const isC=t.type==='credit';
  if(compact)return(
    <div style={{display:'flex',alignItems:'center',gap:12,padding:'11px 0',borderBottom:'1px solid var(--bdr)'}}>
      <SvcIcon svc={t.service} size={34}/>
      <div style={{flex:1,minWidth:0}}>
        <div style={{fontSize:13,fontWeight:500,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{t.provider}</div>
        <div style={{fontSize:11,color:'var(--t3)'}}>{fd(t.date)}</div>
      </div>
      <div style={{fontSize:13,fontWeight:600,color:isC?'var(--ok)':'var(--t1)'}}>{isC?'+':'-'}{fc(t.amount)}</div>
    </div>
  );
  return(
    <div className="tr-row">
      <SvcIcon svc={t.service} size={38}/>
      <div style={{flex:1,minWidth:0}}>
        <div style={{fontSize:14,fontWeight:500,marginBottom:1}}>{t.provider}</div>
        <div style={{fontSize:12,color:'var(--t3)'}}>{t.acct} · {fd(t.date)}</div>
      </div>
      <div style={{textAlign:'right'}}>
        <div style={{fontSize:14,fontWeight:600,color:isC?'var(--ok)':'var(--t1)',marginBottom:4}}>{isC?'+':'-'}{fc(t.amount)}</div>
        <span className={`badge ${sbadge(t.status)}`}>{t.status}</span>
      </div>
    </div>
  );
}

function Toggle({on,setOn}){
  return(
    <div onClick={()=>setOn(!on)} style={{width:42,height:22,borderRadius:99,cursor:'pointer',background:on?'var(--pri)':'var(--bdr)',position:'relative',transition:'background .2s',flexShrink:0}}>
      <div style={{position:'absolute',top:3,left:on?22:3,width:16,height:16,borderRadius:'50%',background:'#fff',transition:'left .2s',boxShadow:'0 1px 3px rgba(0,0,0,.3)'}}/>
    </div>
  );
}

function PrefToggle(){const[on,setOn]=useState(Math.random()>.4);return <Toggle on={on} setOn={setOn}/>;}

// ─── LAYOUT ────────────────────────────────────────────────────
function Sidebar({page,nav,open,setOpen}){
  const{user,logout}=useAuth();
  const{toggleTheme,theme}=useApp();
  const items=[
    {id:'dashboard',I:Home,label:'Dashboard'},
    {id:'payment',I:CreditCard,label:'Pay Bills'},
    {id:'transactions',I:History,label:'Transactions'},
    {id:'profile',I:User,label:'Profile'},
    {id:'settings',I:Settings,label:'Settings'},
    ...(user?.role==='admin'?[{id:'admin',I:BarChart2,label:'Admin'}]:[]),
  ];
  return(
    <>
      {open&&<div onClick={()=>setOpen(false)} style={{position:'fixed',inset:0,background:'rgba(0,0,0,.5)',zIndex:99,backdropFilter:'blur(2px)'}}/>}
      <aside className={`sidebar${open?' open':''}`}>
        <div style={{padding:'22px 18px 18px',borderBottom:'1px solid var(--bdr)'}}>
          <div style={{display:'flex',alignItems:'center',gap:11}}>
            <div style={{width:36,height:36,borderRadius:10,background:'linear-gradient(135deg,var(--pri),var(--vio))',display:'flex',alignItems:'center',justifyContent:'center'}}>
              <Banknote size={19} style={{color:'#fff'}}/>
            </div>
            <div>
              <div style={{fontFamily:'Syne',fontWeight:800,fontSize:17,lineHeight:1}}>UtilPay</div>
              <div style={{fontSize:11,color:'var(--t3)',marginTop:2}}>Bill Payment Portal</div>
            </div>
          </div>
        </div>
        <div style={{padding:'14px 16px',borderBottom:'1px solid var(--bdr)'}}>
          <div style={{display:'flex',alignItems:'center',gap:11}}>
            <Avi user={user} size={36}/>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:13,fontWeight:600,marginBottom:1,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{user?.name}</div>
              <div style={{fontSize:11,color:'var(--t3)',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{user?.email}</div>
            </div>
            <div className="pdot"/>
          </div>
        </div>
        <nav style={{flex:1,padding:'10px 10px',overflowY:'auto'}}>
          {items.map(it=>(
            <div key={it.id} className={`nav-i${page===it.id?' act':''}`} onClick={()=>{nav(it.id);setOpen(false);}}>
              <it.I size={17}/><span>{it.label}</span>
            </div>
          ))}
        </nav>
        <div style={{padding:'12px 10px',borderTop:'1px solid var(--bdr)'}}>
          <div style={{display:'flex',gap:8}}>
            <button className="btn btn-ghost btn-sm" style={{flex:1}} onClick={toggleTheme}>
              {theme==='dark'?<Sun size={15}/>:<Moon size={15}/>}
              <span>{theme==='dark'?'Light':'Dark'}</span>
            </button>
            <button className="btn btn-danger btn-sm" style={{flex:1}} onClick={logout}>
              <LogOut size={15}/><span>Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

function TopBar({page,nav,open,setOpen}){
  const{user}=useAuth();
  const{toast}=useApp();
  const titles={dashboard:'Dashboard',payment:'Pay Bills',transactions:'Transactions',profile:'Profile',settings:'Settings',admin:'Admin Panel'};
  return(
    <div style={{height:62,background:'var(--surf)',borderBottom:'1px solid var(--bdr)',display:'flex',alignItems:'center',padding:'0 20px',gap:14,position:'sticky',top:0,zIndex:50}}>
      <button className="btn btn-ghost" style={{padding:8}} onClick={()=>setOpen(!open)}><Menu size={19}/></button>
      <h1 style={{fontFamily:'Syne',fontSize:17,fontWeight:700}}>{titles[page]||'Page'}</h1>
      <div style={{marginLeft:'auto',display:'flex',alignItems:'center',gap:10}}>
        <div style={{padding:'5px 13px',background:'var(--card)',borderRadius:99,border:'1px solid var(--bdr)',fontSize:13,fontWeight:600,color:'var(--pri)',display:'flex',alignItems:'center',gap:5}} className="hide-mob">
          <Wallet size={13}/>{fc(user?.walletBalance||0)}
        </div>
        <button className="btn btn-ghost" style={{padding:8,position:'relative'}} onClick={()=>toast('No new notifications','info')}>
          <Bell size={17}/>
          <span style={{position:'absolute',top:7,right:7,width:6,height:6,borderRadius:'50%',background:'var(--err)'}}/>
        </button>
        <div onClick={()=>nav('profile')} style={{cursor:'pointer'}}><Avi user={user} size={32}/></div>
      </div>
    </div>
  );
}

// ─── PUBLIC NAV ────────────────────────────────────────────────
function PubNav({nav}){
  return(
    <nav style={{position:'sticky',top:0,zIndex:100,height:64,display:'flex',alignItems:'center',padding:'0 24px',borderBottom:'1px solid var(--bdr)',background:'rgba(6,13,26,.88)',backdropFilter:'blur(14px)'}}>
      <div style={{display:'flex',alignItems:'center',gap:10,flex:1}}>
        <div style={{width:32,height:32,borderRadius:9,background:'linear-gradient(135deg,var(--pri),var(--vio))',display:'flex',alignItems:'center',justifyContent:'center'}}>
          <Banknote size={17} style={{color:'#fff'}}/>
        </div>
        <span style={{fontFamily:'Syne',fontWeight:800,fontSize:19}}>UtilPay</span>
      </div>
      <div style={{display:'flex',alignItems:'center',gap:6}}>
        {['Services','About','Contact'].map(l=>(
          <button key={l} className="btn btn-ghost btn-sm hide-mob" onClick={()=>nav(l.toLowerCase())}>{l}</button>
        ))}
        <button className="btn btn-out btn-sm" onClick={()=>nav('login')}>Login</button>
        <button className="btn btn-pri btn-sm" onClick={()=>nav('register')}>Get Started</button>
      </div>
    </nav>
  );
}

// ─── HOME PAGE ────────────────────────────────────────────────
function HomePage({nav}){
  const feats=[
    {I:Zap,c:'#F59E0B',t:'Electricity Bills',d:'Pay EKEDC, IKEDC, AEDC and more instantly'},
    {I:Droplets,c:'#06B6D4',t:'Water Bills',d:'Lagos, Abuja, and state water boards'},
    {I:Wifi,c:'#8B5CF6',t:'Internet Bills',d:'MTN, Airtel, Glo subscriptions'},
    {I:Tv,c:'#EC4899',t:'Cable TV',d:'DStv, GOtv, StarTimes renewals'},
    {I:Shield,c:'#10B981',t:'Secure Payments',d:'Bank-grade 256-bit SSL encryption'},
    {I:Clock,c:'#F97316',t:'Instant Processing',d:'99.9% uptime, instant confirmation'},
  ];
  return(
    <div style={{background:'var(--bg)'}}>
      <PubNav nav={nav}/>
      <section className="hero-bg" style={{padding:'90px 24px 70px',textAlign:'center',maxWidth:860,margin:'0 auto'}}>
        <div style={{display:'inline-flex',alignItems:'center',gap:8,padding:'5px 15px',borderRadius:99,background:'var(--pri-g)',border:'1px solid rgba(6,182,212,.3)',fontSize:13,color:'var(--pri)',marginBottom:22}}>
          <div className="pdot"/> All utilities in one platform
        </div>
        <h1 style={{fontSize:'clamp(34px,6vw,68px)',fontWeight:800,lineHeight:1.1,marginBottom:22}}>
          Pay All Your Bills{' '}<span className="gt">Instantly</span>
        </h1>
        <p style={{fontSize:17,color:'var(--t2)',maxWidth:520,margin:'0 auto 36px',lineHeight:1.75}}>
          The smartest way to manage electricity, water, internet and cable TV bills. Fast, secure, always available.
        </p>
        <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap'}}>
          <button className="btn btn-pri btn-lg" onClick={()=>nav('register')}>Start Paying Bills <ChevronRight size={17}/></button>
          <button className="btn btn-out btn-lg" onClick={()=>nav('login')}>Sign In</button>
        </div>
      </section>
      <section style={{padding:'0 24px 70px'}}>
        <div style={{maxWidth:860,margin:'0 auto',background:'var(--card)',border:'1px solid var(--bdr)',borderRadius:20,padding:'28px 20px'}}>
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:16,textAlign:'center'}}>
            {[['500K+','Active Users'],['₦2.5B+','Bills Processed'],['99.9%','Uptime'],['4.8★','App Rating']].map(([v,l],i)=>(
              <div key={i}><div style={{fontSize:28,fontWeight:800,fontFamily:'Syne',color:'var(--pri)',marginBottom:3}}>{v}</div><div style={{fontSize:12,color:'var(--t2)'}}>{l}</div></div>
            ))}
          </div>
        </div>
      </section>
      <section style={{padding:'0 24px 90px',maxWidth:1060,margin:'0 auto'}}>
        <h2 style={{fontSize:34,fontWeight:800,textAlign:'center',marginBottom:44}}>Everything You Need</h2>
        <div className="grid-3" style={{gap:22}}>
          {feats.map((f,i)=>(
            <div key={i} className="card">
              <div style={{width:46,height:46,borderRadius:13,background:`${f.c}20`,display:'flex',alignItems:'center',justifyContent:'center',marginBottom:14}}>
                <f.I size={22} style={{color:f.c}}/>
              </div>
              <h3 style={{fontSize:17,fontWeight:700,marginBottom:7}}>{f.t}</h3>
              <p style={{fontSize:13,color:'var(--t2)',lineHeight:1.7}}>{f.d}</p>
            </div>
          ))}
        </div>
      </section>
      <section style={{padding:'70px 24px',background:'var(--surf)',borderTop:'1px solid var(--bdr)',textAlign:'center'}}>
        <h2 style={{fontSize:32,fontWeight:800,marginBottom:14}}>Ready to get started?</h2>
        <p style={{color:'var(--t2)',marginBottom:28,fontSize:15}}>Join 500,000+ Nigerians paying bills with UtilPay</p>
        <button className="btn btn-pri btn-lg" onClick={()=>nav('register')}>Create Free Account</button>
      </section>
      <footer style={{background:'var(--surf)',borderTop:'1px solid var(--bdr)',padding:'36px 24px 22px'}}>
        <div style={{maxWidth:1060,margin:'0 auto',display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:20,marginBottom:28}}>
          <div>
            <div style={{fontFamily:'Syne',fontWeight:800,fontSize:18,marginBottom:7}}>UtilPay</div>
            <p style={{fontSize:13,color:'var(--t2)',maxWidth:200}}>Your trusted utility payment partner in Nigeria.</p>
          </div>
          {[{t:'Services',ls:['Electricity','Water','Internet','Cable TV']},{t:'Company',ls:['About','Careers','Blog','Press']},{t:'Support',ls:['Help Center','Contact','Privacy','Terms']}].map((col,i)=>(
            <div key={i}>
              <div style={{fontSize:13,fontWeight:600,marginBottom:10}}>{col.t}</div>
              {col.ls.map(l=><div key={l} style={{fontSize:13,color:'var(--t3)',marginBottom:7,cursor:'pointer'}} onMouseEnter={e=>e.target.style.color='var(--pri)'} onMouseLeave={e=>e.target.style.color='var(--t3)'}>{l}</div>)}
            </div>
          ))}
        </div>
        <div style={{borderTop:'1px solid var(--bdr)',paddingTop:18,fontSize:12,color:'var(--t3)',textAlign:'center'}}>© 2025 UtilPay. All rights reserved.</div>
      </footer>
    </div>
  );
}

// ─── AUTH PAGES ────────────────────────────────────────────────
function LoginPage({nav}){
  const{login,loading}=useAuth();
  const{toast}=useApp();
  const[form,setForm]=useState({email:'user@utilpay.com',password:'user123'});
  const[errs,setErrs]=useState({});
  const[showPw,setShowPw]=useState(false);
  const upd=(k,v)=>{setForm(f=>({...f,[k]:v}));setErrs(e=>({...e,[k]:''}));};
  const validate=()=>{
    const e={};
    if(!form.email||!/\S+@\S+\.\S+/.test(form.email))e.email='Valid email required';
    if(!form.password||form.password.length<6)e.password='Min 6 characters';
    setErrs(e);return!Object.keys(e).length;
  };
  const submit=async()=>{
    if(!validate())return;
    const r=await login(form.email,form.password);
    if(r.ok){toast(`Welcome back, ${r.user.name.split(' ')[0]}!`,'success');nav('dashboard');}
    else toast(r.err,'error');
  };
  return(
    <div style={{minHeight:'100vh',background:'var(--bg)',display:'flex',alignItems:'center',justifyContent:'center',padding:24}}>
      <div style={{width:'100%',maxWidth:410}}>
        <div style={{textAlign:'center',marginBottom:32}}>
          <div style={{width:54,height:54,borderRadius:15,background:'linear-gradient(135deg,var(--pri),var(--vio))',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 14px'}}><Banknote size={26} style={{color:'#fff'}}/></div>
          <h1 style={{fontSize:26,fontWeight:800,marginBottom:5}}>Welcome Back</h1>
          <p style={{color:'var(--t2)',fontSize:14}}>Sign in to your UtilPay account</p>
        </div>
        <div className="card" style={{padding:28}}>
          <div style={{padding:'10px 14px',background:'var(--pri-g)',borderRadius:10,border:'1px solid rgba(6,182,212,.2)',fontSize:12,marginBottom:22,color:'var(--t2)'}}>
            <div style={{fontWeight:600,marginBottom:3,color:'var(--pri)'}}>Demo Credentials</div>
            <div>User: user@utilpay.com / user123</div>
            <div>Admin: admin@utilpay.com / admin123</div>
          </div>
          {[{k:'email',l:'Email',t:'email',ic:Mail,ph:'you@example.com'},{k:'password',l:'Password',t:showPw?'text':'password',ic:Lock,ph:'••••••••'}].map(f=>(
            <div key={f.k} style={{marginBottom:16}}>
              <label style={{fontSize:13,fontWeight:500,display:'block',marginBottom:6}}>{f.l}</label>
              <div style={{position:'relative'}}>
                <f.ic size={15} style={{position:'absolute',left:13,top:'50%',transform:'translateY(-50%)',color:'var(--t3)'}}/>
                <input className={`inp${errs[f.k]?' inp-err':''}`} style={{paddingLeft:38,paddingRight:f.k==='password'?42:15}} value={form[f.k]} onChange={e=>upd(f.k,e.target.value)} placeholder={f.ph} type={f.t} onKeyDown={e=>e.key==='Enter'&&submit()}/>
                {f.k==='password'&&<button className="btn btn-ghost btn-sm" style={{position:'absolute',right:8,top:'50%',transform:'translateY(-50%)',padding:5}} onClick={()=>setShowPw(!showPw)}>{showPw?<EyeOff size={14}/>:<Eye size={14}/>}</button>}
              </div>
              {errs[f.k]&&<p style={{fontSize:12,color:'var(--err)',marginTop:3}}>{errs[f.k]}</p>}
            </div>
          ))}
          <button className="btn btn-pri" style={{width:'100%',height:46,fontSize:15,marginTop:6}} onClick={submit} disabled={loading}>
            {loading?<><Loader2 size={17} className="spin"/>Signing in...</>:'Sign In'}
          </button>
          <p style={{textAlign:'center',marginTop:18,fontSize:13,color:'var(--t2)'}}>
            No account? <span style={{color:'var(--pri)',cursor:'pointer',fontWeight:500}} onClick={()=>nav('register')}>Create one</span>
          </p>
        </div>
        <p style={{textAlign:'center',marginTop:16}}><span className="btn btn-ghost btn-sm" onClick={()=>nav('home')}>← Back to Home</span></p>
      </div>
    </div>
  );
}

function RegisterPage({nav}){
  const{register,loading}=useAuth();
  const{toast}=useApp();
  const[form,setForm]=useState({name:'',email:'',phone:'',password:'',confirm:''});
  const[errs,setErrs]=useState({});
  const[showPw,setShowPw]=useState(false);
  const upd=(k,v)=>{setForm(f=>({...f,[k]:v}));setErrs(e=>({...e,[k]:''}));};
  const validate=()=>{
    const e={};
    if(!form.name.trim())e.name='Name required';
    if(!/\S+@\S+\.\S+/.test(form.email))e.email='Valid email required';
    if(!form.phone)e.phone='Phone required';
    if(form.password.length<6)e.password='Min 6 characters';
    if(form.password!==form.confirm)e.confirm='Passwords do not match';
    setErrs(e);return!Object.keys(e).length;
  };
  const submit=async()=>{
    if(!validate())return;
    const r=await register(form);
    if(r.ok){toast('Account created!','success');nav('dashboard');}
  };
  const fields=[{k:'name',l:'Full Name',ph:'John Adebayo',I:User,t:'text'},{k:'email',l:'Email',ph:'you@example.com',I:Mail,t:'email'},{k:'phone',l:'Phone',ph:'+234 800 000 0000',I:Phone,t:'tel'}];
  return(
    <div style={{minHeight:'100vh',background:'var(--bg)',display:'flex',alignItems:'center',justifyContent:'center',padding:24}}>
      <div style={{width:'100%',maxWidth:440}}>
        <div style={{textAlign:'center',marginBottom:28}}>
          <h1 style={{fontSize:26,fontWeight:800,marginBottom:5}}>Create Account</h1>
          <p style={{color:'var(--t2)',fontSize:14}}>Join UtilPay — it's free</p>
        </div>
        <div className="card" style={{padding:28}}>
          {fields.map(f=>(
            <div key={f.k} style={{marginBottom:15}}>
              <label style={{fontSize:13,fontWeight:500,display:'block',marginBottom:6}}>{f.l}</label>
              <div style={{position:'relative'}}>
                <f.I size={15} style={{position:'absolute',left:13,top:'50%',transform:'translateY(-50%)',color:'var(--t3)'}}/>
                <input className={`inp${errs[f.k]?' inp-err':''}`} style={{paddingLeft:38}} value={form[f.k]} onChange={e=>upd(f.k,e.target.value)} placeholder={f.ph} type={f.t}/>
              </div>
              {errs[f.k]&&<p style={{fontSize:12,color:'var(--err)',marginTop:3}}>{errs[f.k]}</p>}
            </div>
          ))}
          {[{k:'password',l:'Password',ph:'Min. 6 characters'},{k:'confirm',l:'Confirm Password',ph:'Repeat password'}].map(f=>(
            <div key={f.k} style={{marginBottom:15}}>
              <label style={{fontSize:13,fontWeight:500,display:'block',marginBottom:6}}>{f.l}</label>
              <div style={{position:'relative'}}>
                <Lock size={15} style={{position:'absolute',left:13,top:'50%',transform:'translateY(-50%)',color:'var(--t3)'}}/>
                <input className={`inp${errs[f.k]?' inp-err':''}`} style={{paddingLeft:38,paddingRight:f.k==='password'?42:15}} value={form[f.k]} onChange={e=>upd(f.k,e.target.value)} placeholder={f.ph} type={showPw?'text':'password'}/>
                {f.k==='password'&&<button className="btn btn-ghost btn-sm" style={{position:'absolute',right:8,top:'50%',transform:'translateY(-50%)',padding:5}} onClick={()=>setShowPw(!showPw)}>{showPw?<EyeOff size={14}/>:<Eye size={14}/>}</button>}
              </div>
              {errs[f.k]&&<p style={{fontSize:12,color:'var(--err)',marginTop:3}}>{errs[f.k]}</p>}
            </div>
          ))}
          <button className="btn btn-pri" style={{width:'100%',height:46,fontSize:15,marginTop:8}} onClick={submit} disabled={loading}>
            {loading?<><Loader2 size={17} className="spin"/>Creating...</>:'Create Account'}
          </button>
          <p style={{textAlign:'center',marginTop:16,fontSize:13,color:'var(--t2)'}}>
            Have an account? <span style={{color:'var(--pri)',cursor:'pointer',fontWeight:500}} onClick={()=>nav('login')}>Sign in</span>
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── DASHBOARD ────────────────────────────────────────────────
function DashboardPage({nav}){
  const{user}=useAuth();
  const{txns,toast}=useApp();
  const spent=txns.filter(t=>t.type==='debit'&&t.status==='success').reduce((a,b)=>a+b.amount,0);
  const stats=[
    {title:'Wallet Balance',value:fc(user?.walletBalance||0),icon:Wallet,color:'var(--pri)',change:'+2.5%',up:true},
    {title:'Total Bills Paid',value:fc(spent),icon:CheckCircle,color:'var(--ok)',change:'+12%',up:true},
    {title:'Transactions',value:txns.filter(t=>t.status==='success').length,icon:Activity,color:'var(--vio)',change:'+8',up:true},
    {title:'Pending',value:txns.filter(t=>t.status==='pending').length,icon:Clock,color:'var(--warn)'},
  ];
  const pie=[{name:'Electricity',value:11700,c:'#F59E0B'},{name:'Water',value:4300,c:'#06B6D4'},{name:'Internet',value:7500,c:'#8B5CF6'},{name:'Cable',value:12500,c:'#EC4899'}];
  const tot=pie.reduce((a,b)=>a+b.value,0);
  return(
    <div className="page" style={{padding:22}}>
      <div style={{marginBottom:24}}>
        <h2 style={{fontSize:21,fontWeight:700,marginBottom:3}}>Good day, {user?.name?.split(' ')[0]} 👋</h2>
        <p style={{color:'var(--t2)',fontSize:13}}>Here's your financial overview.</p>
      </div>
      <div className="grid-4" style={{marginBottom:24}}>{stats.map((s,i)=><StatCard key={i} {...s}/>)}</div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 300px',gap:22,marginBottom:22}}>
        <div className="card">
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:18}}>
            <h3 style={{fontSize:15,fontWeight:700}}>Spending Overview</h3>
            <span style={{fontSize:12,color:'var(--t3)'}}>Last 5 months</span>
          </div>
          <ResponsiveContainer width="100%" height={210}>
            <AreaChart data={CHART_DATA}>
              <defs>
                {[['e','#F59E0B'],['w','#06B6D4'],['i','#8B5CF6'],['c','#EC4899']].map(([id,col])=>(
                  <linearGradient key={id} id={`g${id}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={col} stopOpacity={0.28}/>
                    <stop offset="95%" stopColor={col} stopOpacity={0}/>
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--bdr)"/>
              <XAxis dataKey="m" tick={{fill:'var(--t3)',fontSize:12}} axisLine={false} tickLine={false}/>
              <YAxis tick={{fill:'var(--t3)',fontSize:12}} axisLine={false} tickLine={false} tickFormatter={v=>`₦${v/1000}k`}/>
              <Tooltip contentStyle={{background:'var(--card)',border:'1px solid var(--bdr)',borderRadius:10}} formatter={v=>[`₦${v.toLocaleString()}`,'Amount']}/>
              <Area type="monotone" dataKey="electricity" stroke="#F59E0B" fill="url(#ge)" strokeWidth={2}/>
              <Area type="monotone" dataKey="water" stroke="#06B6D4" fill="url(#gw)" strokeWidth={2}/>
              <Area type="monotone" dataKey="internet" stroke="#8B5CF6" fill="url(#gi)" strokeWidth={2}/>
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="card">
          <h3 style={{fontSize:15,fontWeight:700,marginBottom:18}}>Bill Breakdown</h3>
          <ResponsiveContainer width="100%" height={150}>
            <RPieChart>
              <Pie data={pie} cx="50%" cy="50%" innerRadius={45} outerRadius={68} paddingAngle={3} dataKey="value">
                {pie.map((e,i)=><Cell key={i} fill={e.c} strokeWidth={0}/>)}
              </Pie>
              <Tooltip contentStyle={{background:'var(--card)',border:'1px solid var(--bdr)',borderRadius:10}} formatter={v=>[`₦${v.toLocaleString()}`]}/>
            </RPieChart>
          </ResponsiveContainer>
          <div style={{marginTop:10}}>
            {pie.map(d=>(
              <div key={d.name} style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:7}}>
                <div style={{display:'flex',alignItems:'center',gap:8}}>
                  <div style={{width:9,height:9,borderRadius:3,background:d.c}}/>
                  <span style={{fontSize:12,color:'var(--t2)'}}>{d.name}</span>
                </div>
                <span style={{fontSize:12,fontWeight:500}}>{Math.round(d.value/tot*100)}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="card" style={{marginBottom:22}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:18}}>
          <h3 style={{fontSize:15,fontWeight:700}}>Quick Pay</h3>
          <button className="btn btn-ghost btn-sm" onClick={()=>nav('payment')}>All services <ChevronRight size={13}/></button>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:14}}>
          {SERVICES.map(s=>(
            <button key={s.id} onClick={()=>nav('payment')} style={{background:'var(--card2)',border:'1px solid var(--bdr)',borderRadius:13,padding:'17px 12px',cursor:'pointer',textAlign:'center',transition:'all .2s',display:'flex',flexDirection:'column',alignItems:'center',gap:9}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=s.color;e.currentTarget.style.background=`${s.color}12`;}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--bdr)';e.currentTarget.style.background='var(--card2)';}}>
              <div style={{width:44,height:44,borderRadius:12,background:`${s.color}20`,display:'flex',alignItems:'center',justifyContent:'center'}}>
                <s.icon size={21} style={{color:s.color}}/>
              </div>
              <div style={{fontSize:13,fontWeight:600}}>{s.name}</div>
            </button>
          ))}
        </div>
      </div>
      <div className="card">
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:4}}>
          <h3 style={{fontSize:15,fontWeight:700}}>Recent Transactions</h3>
          <button className="btn btn-ghost btn-sm" onClick={()=>nav('transactions')}>View all <ChevronRight size={13}/></button>
        </div>
        {txns.slice(0,5).map(t=><TxnRow key={t.id} t={t} compact/>)}
      </div>
    </div>
  );
}

// ─── PAYMENT PAGE ─────────────────────────────────────────────
function PaymentPage({nav}){
  const{user,update}=useAuth();
  const{toast,addTxn}=useApp();
  const[step,setStep]=useState(1);
  const[svc,setSvc]=useState(null);
  const[form,setForm]=useState({provider:'',acct:'',amount:''});
  const[card,setCard]=useState({num:'',exp:'',cvv:'',name:''});
  const[method,setMethod]=useState('wallet');
  const[proc,setProc]=useState(false);
  const[result,setResult]=useState(null);
  const[errs,setErrs]=useState({});
  const upd=(k,v)=>{setForm(f=>({...f,[k]:v}));setErrs(e=>({...e,[k]:''}));};
  const validate=()=>{
    const e={};
    if(!form.provider)e.provider='Select a provider';
    if(!form.acct.trim())e.acct='Account number required';
    if(!form.amount||Number(form.amount)<100)e.amount='Minimum ₦100';
    setErrs(e);return!Object.keys(e).length;
  };
  const process=async()=>{
    setProc(true);
    await new Promise(r=>setTimeout(r,2500));
    const ok=Math.random()>.15;
    const txn={type:'debit',service:svc.id,provider:PROVIDERS[svc.id].find(p=>p.id===form.provider)?.name||form.provider,amount:Number(form.amount),status:ok?'success':'failed',date:new Date().toISOString().split('T')[0],ref:gid(),acct:form.acct};
    addTxn(txn);
    if(ok&&method==='wallet')update({walletBalance:(user?.walletBalance||0)-Number(form.amount)});
    setResult(txn);setProc(false);setStep(4);
  };
  const proceed=()=>{if(!validate())return;method==='card'?setStep(3):process();};
  const acctLabels={electricity:'Meter Number',water:'Customer ID',internet:'Account Number',cable:'IUC Number'};

  if(step===1)return(
    <div className="page" style={{padding:22}}>
      <h2 style={{fontSize:20,fontWeight:700,marginBottom:5}}>Pay a Bill</h2>
      <p style={{color:'var(--t2)',fontSize:13,marginBottom:24}}>Select the service you want to pay for</p>
      <div className="grid-2" style={{maxWidth:760}}>
        {SERVICES.map(s=>(
          <div key={s.id} onClick={()=>{setSvc(s);setStep(2);setForm({provider:'',acct:'',amount:''}); setErrs({});}}
            style={{background:'var(--card)',border:'1px solid var(--bdr)',borderRadius:16,padding:22,cursor:'pointer',transition:'all .2s',display:'flex',alignItems:'center',gap:18}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=s.color;e.currentTarget.style.transform='translateY(-2px)';e.currentTarget.style.boxShadow='var(--sh)'}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--bdr)';e.currentTarget.style.transform='';e.currentTarget.style.boxShadow=''}}>
            <div style={{width:56,height:56,borderRadius:15,background:`${s.color}20`,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}><s.icon size={26} style={{color:s.color}}/></div>
            <div><div style={{fontFamily:'Syne',fontSize:17,fontWeight:700,marginBottom:3}}>{s.name}</div><div style={{fontSize:13,color:'var(--t2)'}}>{s.desc}</div></div>
            <ChevronRight size={18} style={{color:'var(--t3)',marginLeft:'auto',flexShrink:0}}/>
          </div>
        ))}
      </div>
    </div>
  );

  if(step===2){const pvds=PROVIDERS[svc.id]||[];return(
    <div className="page" style={{padding:22}}>
      <button className="btn btn-ghost btn-sm" style={{marginBottom:18}} onClick={()=>setStep(1)}>← Back</button>
      <div style={{maxWidth:540}}>
        <div style={{display:'flex',alignItems:'center',gap:14,marginBottom:24}}>
          <div style={{width:46,height:46,borderRadius:13,background:`${svc.color}20`,display:'flex',alignItems:'center',justifyContent:'center'}}><svc.icon size={22} style={{color:svc.color}}/></div>
          <div><h2 style={{fontSize:19,fontWeight:700}}>Pay {svc.name} Bill</h2><p style={{fontSize:13,color:'var(--t2)'}}>Fill in the details below</p></div>
        </div>
        <div className="card" style={{padding:26}}>
          <div style={{marginBottom:18}}>
            <label style={{fontSize:13,fontWeight:500,display:'block',marginBottom:7}}>Select Provider</label>
            <div style={{position:'relative'}}>
              <select className={`sel${errs.provider?' inp-err':''}`} value={form.provider} onChange={e=>upd('provider',e.target.value)}>
                <option value="">Choose a provider...</option>
                {pvds.map(p=><option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
              <ChevronDown size={15} style={{position:'absolute',right:13,top:'50%',transform:'translateY(-50%)',color:'var(--t3)',pointerEvents:'none'}}/>
            </div>
            {errs.provider&&<p style={{fontSize:12,color:'var(--err)',marginTop:3}}>{errs.provider}</p>}
          </div>
          <div style={{marginBottom:18}}>
            <label style={{fontSize:13,fontWeight:500,display:'block',marginBottom:7}}>{acctLabels[svc.id]||'Account Number'}</label>
            <input className={`inp${errs.acct?' inp-err':''}`} value={form.acct} onChange={e=>upd('acct',e.target.value)} placeholder="Enter account/meter number"/>
            {errs.acct&&<p style={{fontSize:12,color:'var(--err)',marginTop:3}}>{errs.acct}</p>}
          </div>
          <div style={{marginBottom:22}}>
            <label style={{fontSize:13,fontWeight:500,display:'block',marginBottom:7}}>Amount (₦)</label>
            <div style={{position:'relative'}}>
              <span style={{position:'absolute',left:13,top:'50%',transform:'translateY(-50%)',color:'var(--t2)',fontSize:14,fontWeight:600}}>₦</span>
              <input className={`inp${errs.amount?' inp-err':''}`} style={{paddingLeft:32}} value={form.amount} onChange={e=>upd('amount',e.target.value)} placeholder="0.00" type="number" min="100"/>
            </div>
            {errs.amount&&<p style={{fontSize:12,color:'var(--err)',marginTop:3}}>{errs.amount}</p>}
            <div style={{display:'flex',gap:8,marginTop:9,flexWrap:'wrap'}}>
              {[1000,2500,5000,10000].map(a=>(
                <span key={a} className={`tag${form.amount==a?' on':''}`} onClick={()=>upd('amount',a)}>₦{a.toLocaleString()}</span>
              ))}
            </div>
          </div>
          <div style={{marginBottom:22}}>
            <label style={{fontSize:13,fontWeight:500,display:'block',marginBottom:9}}>Payment Method</label>
            <div style={{display:'flex',gap:12}}>
              {[{id:'wallet',I:Wallet,label:`Wallet (${fc(user?.walletBalance||0)})`},{id:'card',I:CreditCard,label:'Debit Card'}].map(m=>(
                <div key={m.id} onClick={()=>setMethod(m.id)} style={{flex:1,padding:'11px 14px',borderRadius:10,cursor:'pointer',border:`2px solid ${method===m.id?'var(--pri)':'var(--bdr)'}`,background:method===m.id?'var(--pri-g)':'transparent',display:'flex',alignItems:'center',gap:9,transition:'all .15s'}}>
                  <m.I size={16} style={{color:method===m.id?'var(--pri)':'var(--t2)'}}/><span style={{fontSize:13,fontWeight:500,color:method===m.id?'var(--pri)':'var(--t2)'}}>{m.label}</span>
                </div>
              ))}
            </div>
          </div>
          {form.amount&&(
            <div style={{padding:'12px 16px',background:'var(--card2)',borderRadius:9,marginBottom:22,fontSize:13}}>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:5}}><span style={{color:'var(--t2)'}}>Amount</span><span style={{fontWeight:600}}>{fc(form.amount)}</span></div>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:5}}><span style={{color:'var(--t2)'}}>Service Fee</span><span style={{fontWeight:600,color:'var(--ok)'}}>FREE</span></div>
              <div style={{borderTop:'1px solid var(--bdr)',paddingTop:7,marginTop:5,display:'flex',justifyContent:'space-between'}}>
                <span style={{fontWeight:600}}>Total</span><span style={{fontWeight:700,color:'var(--pri)'}}>{fc(form.amount)}</span>
              </div>
            </div>
          )}
          <button className="btn btn-pri" style={{width:'100%',height:48,fontSize:15}} onClick={proceed} disabled={proc}>
            {proc?<><Loader2 size={17} className="spin"/>Processing...</>:`Pay ${form.amount?fc(form.amount):''}`}
          </button>
        </div>
      </div>
    </div>
  );}

  if(step===3){
    const fmtCard=v=>v.replace(/\D/g,'').replace(/(.{4})/g,'$1 ').trim().slice(0,19);
    const fmtExp=v=>v.replace(/\D/g,'').replace(/^(\d{2})(\d)/,'$1/$2').slice(0,5);
    return(
      <div className="page" style={{padding:22}}>
        <button className="btn btn-ghost btn-sm" style={{marginBottom:18}} onClick={()=>setStep(2)}>← Back</button>
        <div style={{maxWidth:460}}>
          <h2 style={{fontSize:19,fontWeight:700,marginBottom:24}}>Card Payment</h2>
          <div style={{background:'linear-gradient(135deg,#0E2A4A,#1A4A7A)',borderRadius:17,padding:26,marginBottom:24,position:'relative',overflow:'hidden',boxShadow:'0 18px 50px rgba(6,182,212,.18)'}}>
            <div style={{position:'absolute',right:-25,top:-25,width:150,height:150,borderRadius:'50%',background:'rgba(6,182,212,.1)'}}/>
            <div style={{position:'absolute',right:15,bottom:-35,width:110,height:110,borderRadius:'50%',background:'rgba(139,92,246,.1)'}}/>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:28,position:'relative'}}>
              <span style={{fontFamily:'Syne',fontWeight:800,fontSize:19,color:'#fff'}}>UtilPay</span>
              <CreditCard size={30} style={{color:'rgba(255,255,255,.4)'}}/>
            </div>
            <div style={{fontFamily:'monospace',fontSize:19,letterSpacing:3,color:'#fff',marginBottom:22,position:'relative'}}>{card.num||'•••• •••• •••• ••••'}</div>
            <div style={{display:'flex',justifyContent:'space-between',position:'relative'}}>
              <div><div style={{fontSize:9,color:'rgba(255,255,255,.5)',marginBottom:2,letterSpacing:1}}>CARD HOLDER</div><div style={{fontSize:13,color:'#fff',fontWeight:600}}>{card.name||'FULL NAME'}</div></div>
              <div><div style={{fontSize:9,color:'rgba(255,255,255,.5)',marginBottom:2,letterSpacing:1}}>EXPIRES</div><div style={{fontSize:13,color:'#fff',fontWeight:600}}>{card.exp||'MM/YY'}</div></div>
            </div>
          </div>
          <div className="card" style={{padding:26}}>
            <div style={{marginBottom:16}}><label style={{fontSize:13,fontWeight:500,display:'block',marginBottom:6}}>Card Number</label><input className="inp" value={card.num} onChange={e=>setCard(c=>({...c,num:fmtCard(e.target.value)}))} placeholder="0000 0000 0000 0000" maxLength={19}/></div>
            <div style={{marginBottom:16}}><label style={{fontSize:13,fontWeight:500,display:'block',marginBottom:6}}>Cardholder Name</label><input className="inp" value={card.name} onChange={e=>setCard(c=>({...c,name:e.target.value.toUpperCase()}))} placeholder="AS ON CARD"/></div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14,marginBottom:22}}>
              <div><label style={{fontSize:13,fontWeight:500,display:'block',marginBottom:6}}>Expiry</label><input className="inp" value={card.exp} onChange={e=>setCard(c=>({...c,exp:fmtExp(e.target.value)}))} placeholder="MM/YY" maxLength={5}/></div>
              <div><label style={{fontSize:13,fontWeight:500,display:'block',marginBottom:6}}>CVV</label><input className="inp" value={card.cvv} onChange={e=>setCard(c=>({...c,cvv:e.target.value.replace(/\D/g,'').slice(0,3)}))} placeholder="•••" maxLength={3} type="password"/></div>
            </div>
            <div style={{display:'flex',alignItems:'center',gap:8,padding:'9px 13px',background:'var(--ok-g)',borderRadius:8,marginBottom:20}}>
              <Shield size={14} style={{color:'var(--ok)',flexShrink:0}}/><span style={{fontSize:12,color:'var(--ok)'}}>256-bit SSL encrypted payment</span>
            </div>
            <button className="btn btn-pri" style={{width:'100%',height:48,fontSize:15}} onClick={process} disabled={proc}>
              {proc?<><Loader2 size={17} className="spin"/>Processing...</>:`Pay ${fc(form.amount)}`}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if(step===4&&result){
    const ok=result.status==='success';
    return(
      <div className="page" style={{padding:22,display:'flex',alignItems:'center',justifyContent:'center',minHeight:'58vh'}}>
        <div style={{textAlign:'center',maxWidth:400}}>
          <div style={{width:76,height:76,borderRadius:'50%',margin:'0 auto 22px',background:ok?'var(--ok-g)':'var(--err-g)',display:'flex',alignItems:'center',justifyContent:'center',border:`2px solid ${ok?'var(--ok)':'var(--err)'}`}}>
            {ok?<CheckCircle size={38} style={{color:'var(--ok)'}}/>:<XCircle size={38} style={{color:'var(--err)'}}/>}
          </div>
          <h2 style={{fontSize:26,fontWeight:800,marginBottom:7}}>{ok?'Payment Successful!':'Payment Failed'}</h2>
          <p style={{color:'var(--t2)',marginBottom:28,fontSize:14}}>{ok?`${svc.name} bill of ${fc(result.amount)} paid successfully.`:'Could not process your payment. Please try again.'}</p>
          {ok&&(
            <div className="card" style={{textAlign:'left',padding:18,marginBottom:24}}>
              {[['Reference',result.ref],['Amount',fc(result.amount)],['Service',result.provider],['Account',result.acct],['Date',fd(result.date)],['Status','Successful']].map(([l,v])=>(
                <div key={l} style={{display:'flex',justifyContent:'space-between',padding:'7px 0',borderBottom:'1px solid var(--bdr)',fontSize:13}}>
                  <span style={{color:'var(--t2)'}}>{l}</span>
                  <span style={{fontWeight:500,color:l==='Status'?'var(--ok)':'var(--t1)'}}>{v}</span>
                </div>
              ))}
            </div>
          )}
          <div style={{display:'flex',gap:12,justifyContent:'center'}}>
            <button className="btn btn-pri" onClick={()=>{setStep(1);setResult(null);}}>{ok?'Pay Another':'Try Again'}</button>
            <button className="btn btn-out" onClick={()=>nav('transactions')}>View History</button>
          </div>
        </div>
      </div>
    );
  }
  return null;
}

// ─── TRANSACTIONS ─────────────────────────────────────────────
function TransactionsPage(){
  const{txns}=useApp();
  const[q,setQ]=useState('');
  const[stat,setStat]=useState('all');
  const[svc,setSvc]=useState('all');
  const filtered=txns.filter(t=>{
    const ms=!q||t.provider.toLowerCase().includes(q.toLowerCase())||t.ref?.toLowerCase().includes(q.toLowerCase());
    const mx=stat==='all'||t.status===stat;
    const mv=svc==='all'||t.service===svc;
    return ms&&mx&&mv;
  });
  const spent=filtered.filter(t=>t.type==='debit').reduce((a,b)=>a+b.amount,0);
  const cred=filtered.filter(t=>t.type==='credit').reduce((a,b)=>a+b.amount,0);
  return(
    <div className="page" style={{padding:22}}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:22}}>
        <div><h2 style={{fontSize:20,fontWeight:700,marginBottom:3}}>Transaction History</h2><p style={{fontSize:13,color:'var(--t2)'}}>{filtered.length} transactions</p></div>
        <button className="btn btn-out btn-sm"><Download size={14}/> Export</button>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:15,marginBottom:20}}>
        {[{I:Activity,c:'var(--pri)',v:filtered.length,l:'Total'},{I:ArrowUpRight,c:'var(--err)',v:fc(spent),l:'Spent'},{I:ArrowDownLeft,c:'var(--ok)',v:fc(cred),l:'Credited'}].map((s,i)=>(
          <div key={i} className="scard" style={{display:'flex',alignItems:'center',gap:12}}>
            <div style={{width:40,height:40,borderRadius:11,background:`${s.c}20`,display:'flex',alignItems:'center',justifyContent:'center'}}><s.I size={18} style={{color:s.c}}/></div>
            <div><div style={{fontSize:18,fontWeight:700,fontFamily:'Syne'}}>{s.v}</div><div style={{fontSize:12,color:'var(--t2)'}}>{s.l}</div></div>
          </div>
        ))}
      </div>
      <div className="card" style={{marginBottom:4}}>
        <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
          <div style={{flex:1,minWidth:180,position:'relative'}}>
            <Search size={15} style={{position:'absolute',left:12,top:'50%',transform:'translateY(-50%)',color:'var(--t3)'}}/>
            <input className="inp" style={{paddingLeft:36}} value={q} onChange={e=>setQ(e.target.value)} placeholder="Search transactions..."/>
          </div>
          <div style={{position:'relative'}}>
            <select className="sel" style={{width:145}} value={stat} onChange={e=>setStat(e.target.value)}>
              <option value="all">All Status</option>
              <option value="success">Success</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
            <ChevronDown size={14} style={{position:'absolute',right:12,top:'50%',transform:'translateY(-50%)',pointerEvents:'none',color:'var(--t3)'}}/>
          </div>
          <div style={{position:'relative'}}>
            <select className="sel" style={{width:155}} value={svc} onChange={e=>setSvc(e.target.value)}>
              <option value="all">All Services</option>
              {SERVICES.map(s=><option key={s.id} value={s.id}>{s.name}</option>)}
              <option value="wallet">Wallet</option>
            </select>
            <ChevronDown size={14} style={{position:'absolute',right:12,top:'50%',transform:'translateY(-50%)',pointerEvents:'none',color:'var(--t3)'}}/>
          </div>
        </div>
      </div>
      <div className="card" style={{padding:0,overflow:'hidden'}}>
        {filtered.length===0?(
          <div style={{textAlign:'center',padding:'55px 24px',color:'var(--t3)'}}>
            <Search size={38} style={{marginBottom:12,opacity:.3}}/>
            <p style={{fontSize:15,marginBottom:4}}>No transactions found</p>
            <p style={{fontSize:13}}>Try adjusting your search or filters</p>
          </div>
        ):filtered.map(t=><TxnRow key={t.id} t={t}/>)}
      </div>
    </div>
  );
}

// ─── PROFILE ─────────────────────────────────────────────────
function ProfilePage(){
  const{user,update}=useAuth();
  const{toast}=useApp();
  const[tab,setTab]=useState('profile');
  const[form,setForm]=useState({name:user?.name||'',email:user?.email||'',phone:user?.phone||'',address:user?.address||''});
  const[saving,setSaving]=useState(false);
  const[pwForm,setPwForm]=useState({cur:'',nw:'',conf:''});
  const[showPw,setShowPw]=useState(false);
  const save=async()=>{
    setSaving(true);await new Promise(r=>setTimeout(r,900));
    update(form);setSaving(false);toast('Profile updated!','success');
  };
  const changePw=async()=>{
    if(!pwForm.cur){toast('Enter current password','error');return;}
    if(pwForm.nw.length<6){toast('Min 6 characters','error');return;}
    if(pwForm.nw!==pwForm.conf){toast('Passwords do not match','error');return;}
    setSaving(true);await new Promise(r=>setTimeout(r,900));
    setSaving(false);toast('Password changed!','success');setPwForm({cur:'',nw:'',conf:''});
  };
  return(
    <div className="page" style={{padding:22}}>
      <h2 style={{fontSize:20,fontWeight:700,marginBottom:22}}>Profile Settings</h2>
      <div className="card" style={{display:'flex',alignItems:'center',gap:20,marginBottom:22,padding:'18px 22px'}}>
        <div style={{position:'relative'}}>
          <Avi user={user} size={76}/>
          <button onClick={()=>toast('Avatar upload coming soon','info')} style={{position:'absolute',bottom:0,right:0,width:26,height:26,borderRadius:'50%',background:'var(--pri)',border:'2px solid var(--surf)',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer'}}>
            <Edit2 size={12} style={{color:'#000'}}/>
          </button>
        </div>
        <div>
          <div style={{fontFamily:'Syne',fontSize:20,fontWeight:700,marginBottom:3}}>{user?.name}</div>
          <div style={{fontSize:13,color:'var(--t2)',marginBottom:8}}>{user?.email}</div>
          <span className={`badge ${user?.role==='admin'?'b-vio':'b-info'}`}>{user?.role==='admin'?'⚡ Admin':'👤 User'}</span>
        </div>
        <div style={{marginLeft:'auto',textAlign:'right'}}>
          <div style={{fontSize:12,color:'var(--t2)',marginBottom:3}}>Wallet Balance</div>
          <div style={{fontSize:22,fontWeight:700,fontFamily:'Syne',color:'var(--pri)'}}>{fc(user?.walletBalance||0)}</div>
        </div>
      </div>
      <div style={{display:'flex',gap:8,marginBottom:22}}>
        {['profile','security','preferences'].map(t=>(
          <button key={t} className={`tag${tab===t?' on':''}`} style={{padding:'8px 18px',textTransform:'capitalize'}} onClick={()=>setTab(t)}>{t}</button>
        ))}
      </div>
      {tab==='profile'&&(
        <div className="card" style={{maxWidth:540,padding:26}}>
          <h3 style={{fontSize:16,fontWeight:700,marginBottom:18}}>Personal Information</h3>
          {[{k:'name',l:'Full Name',I:User},{k:'email',l:'Email',I:Mail},{k:'phone',l:'Phone',I:Phone},{k:'address',l:'Address',I:MapPin}].map(f=>(
            <div key={f.k} style={{marginBottom:16}}>
              <label style={{fontSize:13,fontWeight:500,display:'block',marginBottom:6}}>{f.l}</label>
              <div style={{position:'relative'}}>
                <f.I size={14} style={{position:'absolute',left:12,top:'50%',transform:'translateY(-50%)',color:'var(--t3)'}}/>
                <input className="inp" style={{paddingLeft:36}} value={form[f.k]} onChange={e=>setForm(fr=>({...fr,[f.k]:e.target.value}))}/>
              </div>
            </div>
          ))}
          <button className="btn btn-pri" onClick={save} disabled={saving}>
            {saving?<><Loader2 size={15} className="spin"/>Saving...</>:<><Check size={15}/>Save Changes</>}
          </button>
        </div>
      )}
      {tab==='security'&&(
        <div className="card" style={{maxWidth:540,padding:26}}>
          <h3 style={{fontSize:16,fontWeight:700,marginBottom:18}}>Change Password</h3>
          {[{k:'cur',l:'Current Password'},{k:'nw',l:'New Password'},{k:'conf',l:'Confirm New Password'}].map(f=>(
            <div key={f.k} style={{marginBottom:16}}>
              <label style={{fontSize:13,fontWeight:500,display:'block',marginBottom:6}}>{f.l}</label>
              <div style={{position:'relative'}}>
                <Lock size={14} style={{position:'absolute',left:12,top:'50%',transform:'translateY(-50%)',color:'var(--t3)'}}/>
                <input className="inp" style={{paddingLeft:36,paddingRight:f.k==='nw'?42:16}} value={pwForm[f.k]} onChange={e=>setPwForm(p=>({...p,[f.k]:e.target.value}))} type={showPw?'text':'password'} placeholder="••••••••"/>
                {f.k==='nw'&&<button className="btn btn-ghost btn-sm" style={{position:'absolute',right:8,top:'50%',transform:'translateY(-50%)',padding:5}} onClick={()=>setShowPw(!showPw)}>{showPw?<EyeOff size={13}/>:<Eye size={13}/>}</button>}
              </div>
            </div>
          ))}
          <button className="btn btn-pri" onClick={changePw} disabled={saving}>
            {saving?<><Loader2 size={15} className="spin"/>Updating...</>:'Update Password'}
          </button>
        </div>
      )}
      {tab==='preferences'&&(
        <div className="card" style={{maxWidth:540,padding:26}}>
          <h3 style={{fontSize:16,fontWeight:700,marginBottom:18}}>Preferences</h3>
          {[['Email Notifications','Receive email alerts for transactions'],['SMS Alerts','Get SMS for successful payments'],['Two-Factor Auth','Extra security layer'],['Auto-Pay','Schedule recurring payments']].map(([l,d],i)=>(
            <div key={i} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'13px 0',borderBottom:'1px solid var(--bdr)'}}>
              <div><div style={{fontSize:14,fontWeight:500,marginBottom:1}}>{l}</div><div style={{fontSize:12,color:'var(--t3)'}}>{d}</div></div>
              <PrefToggle/>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── SETTINGS ────────────────────────────────────────────────
function SettingsPage(){
  const{theme,toggleTheme,toast}=useApp();
  function TT(){
    const{theme,toggleTheme}=useApp();
    return<Toggle on={theme==='dark'} setOn={toggleTheme}/>;
  }
  const secs=[
    {t:'Appearance',items:[{l:'Dark Mode',d:'Toggle dark/light theme',a:<TT/>},{l:'Compact View',d:'Reduce spacing',a:<PrefToggle/>}]},
    {t:'Notifications',items:[{l:'Push Notifications',d:'Device alerts',a:<PrefToggle/>},{l:'Transaction Alerts',d:'Per-transaction alerts',a:<PrefToggle/>},{l:'Bill Reminders',d:'Monthly reminders',a:<PrefToggle/>}]},
    {t:'Security',items:[{l:'Two-Factor Auth',d:'Extra security',a:<button className="btn btn-out btn-sm" onClick={()=>toast('2FA coming soon','info')}>Setup</button>},{l:'Login History',d:'Recent login activity',a:<button className="btn btn-ghost btn-sm" onClick={()=>toast('Feature coming soon','info')}>View</button>}]},
    {t:'Payment',items:[{l:'Saved Cards',d:'Manage payment methods',a:<button className="btn btn-out btn-sm" onClick={()=>toast('No saved cards','info')}>Manage</button>},{l:'Auto-Pay',d:'Automatic payments',a:<PrefToggle/>}]},
  ];
  return(
    <div className="page" style={{padding:22,maxWidth:620}}>
      <h2 style={{fontSize:20,fontWeight:700,marginBottom:22}}>Settings</h2>
      {secs.map((s,i)=>(
        <div key={i} style={{marginBottom:24}}>
          <h3 style={{fontSize:12,fontWeight:600,color:'var(--t3)',textTransform:'uppercase',letterSpacing:'.06em',marginBottom:10}}>{s.t}</h3>
          <div className="card" style={{padding:0,overflow:'hidden'}}>
            {s.items.map((it,j)=>(
              <div key={j} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'14px 18px',borderBottom:j<s.items.length-1?'1px solid var(--bdr)':'none'}}>
                <div><div style={{fontSize:14,fontWeight:500,marginBottom:1}}>{it.l}</div><div style={{fontSize:12,color:'var(--t3)'}}>{it.d}</div></div>
                {it.a}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── ADMIN ───────────────────────────────────────────────────
function AdminPage(){
  const{user}=useAuth();
  const{txns}=useApp();
  const[tab,setTab]=useState('overview');
  if(user?.role!=='admin')return(
    <div style={{textAlign:'center',padding:'70px 24px'}}>
      <Shield size={55} style={{color:'var(--err)',marginBottom:14,opacity:.5}}/>
      <h2 style={{fontSize:22,fontWeight:700,marginBottom:7}}>Access Denied</h2>
      <p style={{color:'var(--t2)'}}>Admin privileges required.</p>
    </div>
  );
  const rev=txns.filter(t=>t.type==='debit'&&t.status==='success').reduce((a,b)=>a+b.amount,0);
  const stats=[
    {title:'Total Users',value:ADMIN_USERS.length,icon:Users,color:'var(--pri)'},
    {title:'Transactions',value:txns.length,icon:Activity,color:'var(--vio)'},
    {title:'Revenue',value:fc(rev),icon:Banknote,color:'var(--ok)'},
    {title:'Failed',value:txns.filter(t=>t.status==='failed').length,icon:AlertCircle,color:'var(--err)'},
  ];
  return(
    <div className="page" style={{padding:22}}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:22}}>
        <div><h2 style={{fontSize:20,fontWeight:700,marginBottom:3}}>Admin Panel</h2><p style={{fontSize:13,color:'var(--t2)'}}>Platform overview & management</p></div>
        <span className="badge b-vio">⚡ Admin Access</span>
      </div>
      <div className="grid-4" style={{marginBottom:24}}>{stats.map((s,i)=><StatCard key={i} {...s}/>)}</div>
      <div style={{display:'flex',gap:8,marginBottom:22}}>
        {['overview','users','transactions'].map(t=>(
          <button key={t} className={`tag${tab===t?' on':''}`} style={{padding:'8px 18px',textTransform:'capitalize'}} onClick={()=>setTab(t)}>{t}</button>
        ))}
      </div>
      {tab==='overview'&&(
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:22}}>
          <div className="card">
            <h3 style={{fontSize:15,fontWeight:700,marginBottom:18}}>Revenue by Service</h3>
            <ResponsiveContainer width="100%" height={230}>
              <BarChart data={CHART_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--bdr)"/>
                <XAxis dataKey="m" tick={{fill:'var(--t3)',fontSize:12}} axisLine={false} tickLine={false}/>
                <YAxis tick={{fill:'var(--t3)',fontSize:12}} axisLine={false} tickLine={false} tickFormatter={v=>`${v/1000}k`}/>
                <Tooltip contentStyle={{background:'var(--card)',border:'1px solid var(--bdr)',borderRadius:10}} formatter={v=>[`₦${v.toLocaleString()}`]}/>
                <Bar dataKey="electricity" fill="#F59E0B" radius={[4,4,0,0]}/>
                <Bar dataKey="water" fill="#06B6D4" radius={[4,4,0,0]}/>
                <Bar dataKey="internet" fill="#8B5CF6" radius={[4,4,0,0]}/>
                <Bar dataKey="cable" fill="#EC4899" radius={[4,4,0,0]}/>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="card">
            <h3 style={{fontSize:15,fontWeight:700,marginBottom:18}}>Transaction Status</h3>
            <ResponsiveContainer width="100%" height={190}>
              <RPieChart>
                <Pie data={[{name:'Success',value:txns.filter(t=>t.status==='success').length},{name:'Pending',value:txns.filter(t=>t.status==='pending').length},{name:'Failed',value:txns.filter(t=>t.status==='failed').length}]} cx="50%" cy="50%" outerRadius={78} dataKey="value" paddingAngle={3}>
                  {['#10B981','#F59E0B','#EF4444'].map((c,i)=><Cell key={i} fill={c} strokeWidth={0}/>)}
                </Pie>
                <Tooltip contentStyle={{background:'var(--card)',border:'1px solid var(--bdr)',borderRadius:10}}/>
                <Legend/>
              </RPieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
      {tab==='users'&&(
        <div className="card" style={{padding:0,overflow:'hidden'}}>
          <div style={{display:'grid',gridTemplateColumns:'2fr 2fr 1fr 1fr 1.2fr',padding:'11px 18px',borderBottom:'1px solid var(--bdr)',background:'var(--card2)',fontSize:12,fontWeight:600,color:'var(--t3)',textTransform:'uppercase',letterSpacing:'.05em'}}>
            <span>User</span><span>Email</span><span>Txns</span><span>Status</span><span>Spent</span>
          </div>
          {ADMIN_USERS.map(u=>(
            <div key={u.id} style={{display:'grid',gridTemplateColumns:'2fr 2fr 1fr 1fr 1.2fr',padding:'13px 18px',borderBottom:'1px solid var(--bdr)',alignItems:'center',fontSize:13}}
              onMouseEnter={e=>e.currentTarget.style.background='var(--card2)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
              <div style={{display:'flex',alignItems:'center',gap:10}}>
                <div style={{width:32,height:32,borderRadius:'50%',background:'linear-gradient(135deg,var(--pri),var(--vio))',display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,fontWeight:700,color:'#fff',flexShrink:0}}>{u.name.split(' ').map(n=>n[0]).join('').slice(0,2)}</div>
                <span style={{fontWeight:500}}>{u.name}</span>
              </div>
              <span style={{color:'var(--t2)'}}>{u.email}</span>
              <span style={{fontWeight:600}}>{u.txns}</span>
              <span className={`badge ${u.status==='active'?'b-ok':'b-err'}`}>{u.status}</span>
              <span style={{fontWeight:600}}>{fc(u.spent)}</span>
            </div>
          ))}
        </div>
      )}
      {tab==='transactions'&&(
        <div className="card" style={{padding:0,overflow:'hidden'}}>
          {txns.slice(0,10).map(t=><TxnRow key={t.id} t={t}/>)}
        </div>
      )}
    </div>
  );
}

// ─── PUBLIC PAGES ─────────────────────────────────────────────
function ServicesPage({nav}){
  return(
    <div style={{background:'var(--bg)'}}>
      <PubNav nav={nav}/>
      <div style={{padding:'60px 24px',maxWidth:1060,margin:'0 auto'}}>
        <h1 style={{fontSize:38,fontWeight:800,textAlign:'center',marginBottom:10}}>Our Services</h1>
        <p style={{textAlign:'center',color:'var(--t2)',marginBottom:54,fontSize:15}}>Pay all utilities in one place</p>
        <div className="grid-2" style={{gap:26}}>
          {SERVICES.map(s=>(
            <div key={s.id} className="card" style={{display:'flex',gap:18,alignItems:'flex-start'}}>
              <div style={{width:54,height:54,borderRadius:15,background:`${s.color}20`,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}><s.icon size={26} style={{color:s.color}}/></div>
              <div>
                <h3 style={{fontSize:17,fontWeight:700,marginBottom:7}}>{s.name}</h3>
                <p style={{color:'var(--t2)',fontSize:13,marginBottom:14,lineHeight:1.7}}>{s.desc}. All major Nigerian providers supported.</p>
                <div style={{display:'flex',flexWrap:'wrap',gap:7}}>
                  {(PROVIDERS[s.id]||[]).map(p=><span key={p.id} className="tag">{p.name}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AboutPage({nav}){
  return(
    <div style={{background:'var(--bg)'}}>
      <PubNav nav={nav}/>
      <div style={{padding:'70px 24px',maxWidth:800,margin:'0 auto',textAlign:'center'}}>
        <h1 style={{fontSize:38,fontWeight:800,marginBottom:18}}>About UtilPay</h1>
        <p style={{color:'var(--t2)',fontSize:15,lineHeight:1.8,marginBottom:54}}>Nigeria's premier utility payment platform, making it easy for millions of Nigerians to pay electricity, water, internet, and cable TV bills instantly and securely.</p>
        <div className="grid-3" style={{gap:22}}>
          {[{I:Star,t:'Our Mission',d:'Make utility payments simple, fast, and accessible for every Nigerian.'},{I:Shield,t:'Security First',d:'Bank-grade 256-bit SSL encryption protecting every transaction.'},{I:Users,t:'Trusted',d:'Over 500,000 active users trust UtilPay for monthly payments.'}].map((it,i)=>(
            <div key={i} className="card">
              <div style={{width:50,height:50,borderRadius:14,background:'var(--pri-g)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 14px'}}><it.I size={22} style={{color:'var(--pri)'}}/></div>
              <h3 style={{fontSize:16,fontWeight:700,marginBottom:7}}>{it.t}</h3>
              <p style={{fontSize:13,color:'var(--t2)',lineHeight:1.7}}>{it.d}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ContactPage({nav}){
  const{toast}=useApp();
  const[form,setForm]=useState({name:'',email:'',subject:'',message:''});
  const[sending,setSending]=useState(false);
  const send=async()=>{
    if(!form.name||!form.email||!form.message){toast('Fill in all fields','error');return;}
    setSending(true);await new Promise(r=>setTimeout(r,1400));
    setSending(false);toast("Message sent! We'll respond within 24h.",'success');
    setForm({name:'',email:'',subject:'',message:''});
  };
  return(
    <div style={{background:'var(--bg)'}}>
      <PubNav nav={nav}/>
      <div style={{padding:'55px 24px',maxWidth:960,margin:'0 auto'}}>
        <h1 style={{fontSize:36,fontWeight:800,textAlign:'center',marginBottom:10}}>Get in Touch</h1>
        <p style={{textAlign:'center',color:'var(--t2)',fontSize:15,marginBottom:52}}>We're here to help</p>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1.5fr',gap:44}}>
          <div>
            {[{I:Mail,t:'Email',v:'support@utilpay.ng'},{I:Phone,t:'Phone',v:'+234 800 UTILPAY'},{I:MapPin,t:'Address',v:'14 Marina Street, Lagos'},{I:Clock,t:'Hours',v:'Mon–Fri, 8AM–6PM WAT'}].map((it,i)=>(
              <div key={i} style={{display:'flex',alignItems:'flex-start',gap:14,marginBottom:22}}>
                <div style={{width:42,height:42,borderRadius:11,background:'var(--pri-g)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}><it.I size={19} style={{color:'var(--pri)'}}/></div>
                <div><div style={{fontSize:12,color:'var(--t3)',marginBottom:2}}>{it.t}</div><div style={{fontSize:14,fontWeight:500}}>{it.v}</div></div>
              </div>
            ))}
          </div>
          <div className="card" style={{padding:28}}>
            {['name','email','subject'].map(k=>(
              <div key={k} style={{marginBottom:16}}>
                <label style={{fontSize:13,fontWeight:500,display:'block',marginBottom:6,textTransform:'capitalize'}}>{k}</label>
                <input className="inp" value={form[k]} onChange={e=>setForm(f=>({...f,[k]:e.target.value}))} placeholder={`Your ${k}`} type={k==='email'?'email':'text'}/>
              </div>
            ))}
            <div style={{marginBottom:20}}>
              <label style={{fontSize:13,fontWeight:500,display:'block',marginBottom:6}}>Message</label>
              <textarea className="inp" rows={4} value={form.message} onChange={e=>setForm(f=>({...f,message:e.target.value}))} placeholder="How can we help?"/>
            </div>
            <button className="btn btn-pri" style={{width:'100%',height:46}} onClick={send} disabled={sending}>
              {sending?<><Loader2 size={16} className="spin"/>Sending...</>:<><Send size={15}/>Send Message</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function NotFoundPage({nav}){
  return(
    <div style={{minHeight:'100vh',background:'var(--bg)',display:'flex',alignItems:'center',justifyContent:'center',padding:24,textAlign:'center'}}>
      <div>
        <div style={{fontSize:96,fontFamily:'Syne',fontWeight:900,color:'var(--bdr2)',lineHeight:1}}>404</div>
        <h2 style={{fontSize:26,fontWeight:700,marginBottom:10}}>Page Not Found</h2>
        <p style={{color:'var(--t2)',marginBottom:28,fontSize:14}}>The page you're looking for doesn't exist.</p>
        <button className="btn btn-pri" onClick={()=>nav('home')}>Go Home</button>
      </div>
    </div>
  );
}

// ─── APP ─────────────────────────────────────────────────────
const DASH_PAGES=['dashboard','payment','transactions','profile','settings','admin'];

function AppContent(){
  const[route,setRoute]=useState({page:'home'});
  const{user}=useAuth();
  const{theme}=useApp();
  const[sbOpen,setSbOpen]=useState(false);
  const nav=(page)=>{setRoute({page});setSbOpen(false);if(typeof window!=='undefined')window.scrollTo(0,0);};
  const cls=theme==='light'?'light':'';
  if(DASH_PAGES.includes(route.page)&&!user)return(<div className={cls}><GStyles/><Toasts/><LoginPage nav={nav}/></div>);
  if((route.page==='login'||route.page==='register')&&user){nav('dashboard');return null;}
  if(DASH_PAGES.includes(route.page)){
    const pages={dashboard:<DashboardPage nav={nav}/>,payment:<PaymentPage nav={nav}/>,transactions:<TransactionsPage/>,profile:<ProfilePage/>,settings:<SettingsPage/>,admin:<AdminPage/>};
    return(
      <div className={cls}>
        <GStyles/><Toasts/><Modal/>
        <Sidebar page={route.page} nav={nav} open={sbOpen} setOpen={setSbOpen}/>
        <div className="mcontent">
          <TopBar page={route.page} nav={nav} open={sbOpen} setOpen={setSbOpen}/>
          <main style={{background:'var(--bg)'}}>{pages[route.page]}</main>
        </div>
      </div>
    );
  }
  const pub={home:<HomePage nav={nav}/>,login:<LoginPage nav={nav}/>,register:<RegisterPage nav={nav}/>,services:<ServicesPage nav={nav}/>,about:<AboutPage nav={nav}/>,contact:<ContactPage nav={nav}/>};
  return(
    <div className={cls}><GStyles/><Toasts/><Modal/>{pub[route.page]||<NotFoundPage nav={nav}/>}</div>
  );
}

export default function App(){
  return(
    <AppProvider>
      <AuthProvider>
        <AppContent/>
      </AuthProvider>
    </AppProvider>
  );
}
