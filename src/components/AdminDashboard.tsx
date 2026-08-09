import React, { useState } from 'react';
import { getWaiters, getReviews, getOrders, getSubscription, addWaiter, updateWaiter, deleteWaiter, type Waiter, type Review } from '../utils/mockData';
import { 
  CustomUsers as Users, 
  CustomStar as Star, 
  CustomDollarSign as DollarSign, 
  CustomCreditCard as CreditCard, 
  CustomTrendingUp as TrendingUp, 
  CustomPlus as Plus, 
  CustomQrCode as QrCode, 
  CustomPrinter as Printer, 
  CustomDownload as Download, 
  CustomShieldCheck as ShieldCheck, 
  CustomMapPin as MapPin, 
  CustomBarChart3 as BarChart2, 
  CustomSearch as Search, 
  CustomFilter as Filter, 
  CustomArrowUpDown as ArrowUpDown, 
  CustomEye as Eye, 
  CustomCheckCircle as CheckCircle, 
  CustomMessageSquare as MessageSquare, 
  CustomZap as Zap, 
  CustomTrash2 as Trash2, 
  CustomEdit3 as Edit3, 
  CustomImage as Image, 
  CustomUpload as Upload, 
  CustomRefreshCw as RefreshCw
} from './CustomIcons';
import { 
  IconCyberAnalytics, IconVipWaiters, IconEuroChip, IconSmartRadar, 
  IconCyberQr, IconAddUserOrb, IconPrismStar, IconNfcChip, IconTipTapMark 
} from './CustomIcons';

interface AdminDashboardProps {
  onNavigateToCustomizer?: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigateToCustomizer }) => {
  const [waiters, setWaiters] = useState<Waiter[]>(getWaiters());
  const reviews = getReviews();
  const orders = getOrders();
  const subscription = getSubscription();

  const [activeTab, setActiveTab] = useState<'analytics' | 'waiters' | 'reviews' | 'payouts' | 'google' | 'orders'>('analytics');
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | 'year'>('30d');
  
  // Waiter Sorting & Filtering State
  const [waiterSortBy, setWaiterSortBy] = useState<'rating' | 'tips' | 'scans' | 'reviews'>('rating');
  const [waiterRoleFilter, setWaiterRoleFilter] = useState<string>('all');
  const [selectedWaiterDetails, setSelectedWaiterDetails] = useState<Waiter | null>(null);
  const [waiterDetailStarFilter, setWaiterDetailStarFilter] = useState<number | 'all'>('all');
  const [waiterDetailSortBy, setWaiterDetailSortBy] = useState<'newest' | 'oldest' | 'rating_high'>('newest');

  // Reviews Feed Sorting & Filtering State
  const [reviewStarFilter, setReviewStarFilter] = useState<number | 'all'>('all');
  const [reviewSortBy, setReviewSortBy] = useState<'newest' | 'rating_high' | 'rating_low' | 'tip_high'>('newest');
  const [reviewSearchQuery, setReviewSearchQuery] = useState<string>('');

  // Modals state for Add / Edit Waiter
  const [editingWaiter, setEditingWaiter] = useState<Waiter | null>(null); // null means creating new
  const [showWaiterModal, setShowWaiterModal] = useState<boolean>(false);
  const [formName, setFormName] = useState<string>('');
  const [formRole, setFormRole] = useState<string>('Сервитьор');
  const [formAvatar, setFormAvatar] = useState<string>('');
  const [deleteConfirmWaiter, setDeleteConfirmWaiter] = useState<Waiter | null>(null);

  const [printQrWaiter, setPrintQrWaiter] = useState<Waiter | null>(null);

  // Settings State
  const [googlePlaceId, setGooglePlaceId] = useState<string>('https://maps.google.com/?cid=108273619283');
  const [minStarRedirect, setMinStarRedirect] = useState<number>(4);
  const [tipPoolSplit, setTipPoolSplit] = useState<number>(85); // 85% waiter / 15% team pool

  // Avatar Presets
  const avatarPresets = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200',
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=200',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200'
  ];

  // Overview Calculations
  const totalReviewsCount = waiters.reduce((acc, w) => acc + w.totalReviews, 0);
  const totalTipsSum = waiters.reduce((acc, w) => acc + w.totalTips, 0);
  const totalScansSum = waiters.reduce((acc, w) => acc + (w.scanCount || 0), 0);
  const avgRating = waiters.length > 0 
    ? (waiters.reduce((acc, w) => acc + w.rating, 0) / waiters.length).toFixed(1)
    : '5.0';

  const openCreateModal = () => {
    setEditingWaiter(null);
    setFormName('');
    setFormRole('Сервитьор');
    setFormAvatar(avatarPresets[0]);
    setShowWaiterModal(true);
  };

  const openEditModal = (w: Waiter) => {
    setEditingWaiter(w);
    setFormName(w.name);
    setFormRole(w.role);
    setFormAvatar(w.avatar);
    setShowWaiterModal(true);
  };

  const handleSaveWaiter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    if (editingWaiter) {
      // Edit existing
      const updated = updateWaiter({
        ...editingWaiter,
        name: formName,
        role: formRole,
        avatar: formAvatar || editingWaiter.avatar
      });
      setWaiters(getWaiters());
    } else {
      // Add new
      addWaiter(formName, formRole, formAvatar);
      setWaiters(getWaiters());
    }

    setShowWaiterModal(false);
  };

  const handleDeleteWaiterConfirmed = () => {
    if (!deleteConfirmWaiter) return;
    deleteWaiter(deleteConfirmWaiter.id);
    setWaiters(getWaiters());
    if (selectedWaiterDetails?.id === deleteConfirmWaiter.id) {
      setSelectedWaiterDetails(null);
    }
    setDeleteConfirmWaiter(null);
  };

  const exportCSVReport = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Име,Позиция,Оценка,Сканирания,Брой Отзиви,Събрани Бакшиши (€)\n"
      + waiters.map(w => `"${w.name}","${w.role}",${w.rating},${w.scanCount || 0},${w.totalReviews},${w.totalTips}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `TipTap_Detailed_Report_${new Date().toISOString().substring(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered & Sorted Waiters
  const sortedWaiters = [...waiters]
    .filter(w => waiterRoleFilter === 'all' || w.role.toLowerCase().includes(waiterRoleFilter.toLowerCase()))
    .sort((a, b) => {
      if (waiterSortBy === 'rating') return b.rating - a.rating;
      if (waiterSortBy === 'tips') return b.totalTips - a.totalTips;
      if (waiterSortBy === 'scans') return (b.scanCount || 0) - (a.scanCount || 0);
      if (waiterSortBy === 'reviews') return b.totalReviews - a.totalReviews;
      return 0;
    });

  // Filtered & Sorted Reviews
  const processedReviews = [...reviews]
    .filter(r => {
      if (reviewStarFilter !== 'all' && r.rating !== reviewStarFilter) return false;
      if (reviewSearchQuery.trim()) {
        const query = reviewSearchQuery.toLowerCase();
        return r.waiterName.toLowerCase().includes(query) || r.comment.toLowerCase().includes(query);
      }
      return true;
    })
    .sort((a, b) => {
      if (reviewSortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      if (reviewSortBy === 'rating_high') return b.rating - a.rating;
      if (reviewSortBy === 'rating_low') return a.rating - b.rating;
      if (reviewSortBy === 'tip_high') return b.tipAmount - a.tipAmount;
      return 0;
    });

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '2rem', width: '100%', maxWidth: '1440px', margin: '0 auto', alignItems: 'start' }}>
      
      {/* LEFT EXECUTIVE SIDEBAR */}
      <aside className="glass-panel" style={{ 
        padding: '1.5rem 1rem', 
        borderRadius: '24px', 
        background: 'rgba(12, 12, 24, 0.95)', 
        border: '1px solid rgba(139, 92, 246, 0.3)',
        boxShadow: '0 15px 35px rgba(0,0,0,0.6)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.75rem',
        position: 'sticky',
        top: '6rem'
      }}>
        {/* RESTAURANT BRAND BRANDING */}
        <div style={{ padding: '0 0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.35rem' }}>
            <img src="/logo.jpg" alt="TipTap Logo" style={{ width: '28px', height: '28px', borderRadius: '8px', objectFit: 'cover' }} />
            <span style={{ fontWeight: 800, fontSize: '1.1rem', letterSpacing: '0.5px' }} className="text-gradient-purple">
              TipTap SaaS
            </span>
          </div>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', fontWeight: 600 }}>
            🏢 Ресторант Леденика (София)
          </span>
          <div style={{ 
            marginTop: '0.45rem', 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '4px', 
            background: 'rgba(245, 158, 11, 0.15)', 
            border: '1px solid rgba(245, 158, 11, 0.4)', 
            padding: '0.2rem 0.55rem', 
            borderRadius: '99px',
            fontSize: '0.65rem',
            fontWeight: 800,
            color: '#f59e0b'
          }}>
            <span>⚡ ДЕМО ТАБЛО ЗА УПРАВИТЕЛИ</span>
          </div>
        </div>

        {/* NAVIGATION GROUP 1: MAIN */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-muted)', letterSpacing: '1px', textTransform: 'uppercase', padding: '0 0.5rem 0.35rem' }}>
            Основни Раздели
          </span>

          {[
            { id: 'analytics', label: 'Анализи & Табло', icon: <IconCyberAnalytics size={20} /> },
            { id: 'waiters', label: 'Сервитьори & Карти', icon: <IconVipWaiters size={20} />, badge: waiters.length },
            { id: 'reviews', label: 'Коментари & Отзиви', icon: <MessageSquare size={18} />, badge: reviews.length }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.75rem 0.85rem',
                borderRadius: '12px',
                background: activeTab === item.id ? 'var(--accent-purple)' : 'transparent',
                color: activeTab === item.id ? '#fff' : 'var(--text-secondary)',
                fontWeight: activeTab === item.id ? 700 : 500,
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.875rem',
                transition: 'all 0.2s ease',
                boxShadow: activeTab === item.id ? '0 4px 15px rgba(139, 92, 246, 0.4)' : 'none'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                {item.icon}
                <span>{item.label}</span>
              </div>
              {item.badge !== undefined && (
                <span style={{ 
                  fontSize: '0.72rem', 
                  fontWeight: 800, 
                  padding: '0.15rem 0.5rem', 
                  borderRadius: '99px', 
                  background: activeTab === item.id ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.06)', 
                  color: '#fff' 
                }}>
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* NAVIGATION GROUP 2: FINANCE & CONFIG */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-muted)', letterSpacing: '1px', textTransform: 'uppercase', padding: '0 0.5rem 0.35rem' }}>
            Финанси &amp; Настройки
          </span>

          {[
            { id: 'payouts', label: 'Изплащания & IBAN', icon: <IconEuroChip size={20} /> },
            { id: 'google', label: 'Google Reviews Booster', icon: <IconSmartRadar size={20} /> },
            { id: 'orders', label: 'NFC Поръчки & Склад', icon: <IconNfcChip size={20} /> }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                padding: '0.75rem 0.85rem',
                borderRadius: '12px',
                background: activeTab === item.id ? 'var(--accent-purple)' : 'transparent',
                color: activeTab === item.id ? '#fff' : 'var(--text-secondary)',
                fontWeight: activeTab === item.id ? 700 : 500,
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.875rem',
                transition: 'all 0.2s ease',
                boxShadow: activeTab === item.id ? '0 4px 15px rgba(139, 92, 246, 0.4)' : 'none'
              }}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* SIDEBAR FOOTER STRIP */}
        <div style={{ 
          marginTop: 'auto', 
          paddingTop: '1rem', 
          borderTop: '1px solid var(--border-light)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--green)', fontWeight: 700 }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--green)', boxShadow: '0 0 8px var(--green)' }}></span>
            <span>Онлайн PRO Абонамент</span>
          </div>

          {onNavigateToCustomizer && (
            <button 
              className="btn ios-glass-btn-primary" 
              style={{ width: '100%', fontSize: '0.8rem', padding: '0.6rem' }}
              onClick={onNavigateToCustomizer}
            >
              <Plus size={14} /> Поръчай Още Карти
            </button>
          )}
        </div>
      </aside>

      {/* RIGHT MAIN WORKSPACE */}
      <main style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', width: '100%' }}>
        
        {/* INTERACTIVE DEMO BANNER FOR MANAGERS */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.18) 0%, rgba(6, 182, 212, 0.12) 100%)',
          border: '1.5px solid rgba(139, 92, 246, 0.45)',
          borderRadius: '20px',
          padding: '1.1rem 1.6rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          flexWrap: 'wrap',
          boxShadow: '0 8px 30px rgba(139, 92, 246, 0.18)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.1rem' }}>
            <div style={{
              padding: '0.65rem',
              borderRadius: '12px',
              background: 'rgba(245, 158, 11, 0.2)',
              border: '1.5px solid #f59e0b',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 15px rgba(245, 158, 11, 0.3)'
            }}>
              <IconCyberAnalytics size={28} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span style={{ 
                  fontSize: '0.68rem', 
                  fontWeight: 900, 
                  background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', 
                  color: '#1e1000', 
                  padding: '0.18rem 0.6rem', 
                  borderRadius: '99px', 
                  letterSpacing: '1px',
                  textTransform: 'uppercase' 
                }}>
                  ИНТЕРАКТИВНО ДЕМО ЗА УПРАВИТЕЛИ
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>• Жив симулатор на табло</span>
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: '0.25rem 0 0 0', color: '#fff' }}>
                Разгледайте как изглежда контролният панел за вашето заведение
              </h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: '0.15rem 0 0 0' }}>
                Това е пълна демо среда: можете да тествате добавяне на сервитьор, преглед на оценки, онлайн бакшиши и Google 5★ статистика.
              </p>
            </div>
          </div>

          {onNavigateToCustomizer && (
            <button 
              className="btn ios-glass-btn-primary" 
              style={{ fontSize: '0.85rem', padding: '0.65rem 1.4rem' }}
              onClick={onNavigateToCustomizer}
            >
              Поръчай NFC Карти →
            </button>
          )}
        </div>
        
        {/* WORKSPACE HEADER BAR */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          flexWrap: 'wrap', 
          gap: '1.25rem',
          background: 'rgba(14, 14, 26, 0.85)',
          backdropFilter: 'blur(20px)',
          padding: '1.5rem 2rem',
          borderRadius: '24px',
          border: '1px solid var(--border-light)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
        }}>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--accent-purple)', fontWeight: 700, letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              {activeTab === 'analytics' && <><IconCyberAnalytics size={16} /> ТАБЛО &amp; АНАЛИЗИ</>}
              {activeTab === 'waiters' && <><IconVipWaiters size={16} /> РАНГЛИСТА &amp; ПРОФИЛИ СЕРВИТЬОРИ</>}
              {activeTab === 'reviews' && <><MessageSquare size={16} /> КЛИЕНТСКИ ОТЗИВИ</>}
              {activeTab === 'payouts' && <><IconEuroChip size={16} /> БАНКОВИ ИЗПЛАЩАНИЯ</>}
              {activeTab === 'google' && <><IconSmartRadar size={16} /> GOOGLE MAPS BOOSTER</>}
              {activeTab === 'orders' && <><IconNfcChip size={16} /> СКЛАД И NFC КАРТИ</>}
            </span>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, margin: '0.2rem 0 0' }}>
              {activeTab === 'analytics' && 'Общ преглед на приходите & рейтингите'}
              {activeTab === 'waiters' && 'Управление, редактиране и премахване на сервитьори'}
              {activeTab === 'reviews' && 'Хронология на всички коментари от гости'}
              {activeTab === 'payouts' && 'Настройки на IBAN & Tip Pool разпределение'}
              {activeTab === 'google' && 'Автоматично насочване на 5★ отзиви'}
              {activeTab === 'orders' && 'Управление на поръчаните NFC карти & замяна'}
            </h1>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
            {/* Time Filter Toggle */}
            <div style={{ display: 'flex', background: 'rgba(255,255,255,0.04)', padding: '3px', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
              {(['7d', '30d', 'year'] as const).map(t => (
                <button
                  key={t}
                  onClick={() => setTimeRange(t)}
                  style={{
                    padding: '0.4rem 0.85rem',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    borderRadius: '99px',
                    background: timeRange === t ? 'var(--accent-purple)' : 'transparent',
                    color: timeRange === t ? '#fff' : 'var(--text-muted)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {t === '7d' ? '7 Дни' : t === '30d' ? '30 Дни' : '1 Година'}
                </button>
              ))}
            </div>

            <button className="btn btn-secondary" style={{ fontSize: '0.85rem', padding: '0.55rem 1.1rem' }} onClick={exportCSVReport}>
              <Download size={16} /> Експорт CSV
            </button>
            
            <button className="btn ios-glass-btn-primary" style={{ fontSize: '0.85rem', padding: '0.55rem 1.1rem' }} onClick={openCreateModal}>
              <Plus size={16} /> Нов Сервитьор
            </button>
          </div>
        </div>

        {/* 4 EXECUTIVE KPI CARDS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
          <div className="glow-border-card" style={{ padding: '1.5rem', background: 'rgba(14, 14, 26, 0.85)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.825rem', fontWeight: 600 }}>Общо Бакшиши</span>
              <IconEuroChip size={28} />
            </div>
            <h3 style={{ fontSize: '2rem', fontWeight: 800, margin: 0, color: 'var(--green)' }}>
              €{totalTipsSum.toFixed(2)}
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.4rem', fontSize: '0.78rem', color: 'var(--green)' }}>
              <TrendingUp size={14} /> <span>+28% този месец</span>
            </div>
          </div>

          <div className="glow-border-card" style={{ padding: '1.5rem', background: 'rgba(14, 14, 26, 0.85)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.825rem', fontWeight: 600 }}>NFC Сканирания</span>
              <IconNfcChip size={28} />
            </div>
            <h3 style={{ fontSize: '2rem', fontWeight: 800, margin: 0, color: '#fff' }}>
              {totalScansSum}
            </h3>
            <span style={{ fontSize: '0.78rem', color: 'var(--accent-cyan)', marginTop: '0.4rem', display: 'block' }}>
              88% конверсия към отзив
            </span>
          </div>

          <div className="glow-border-card" style={{ padding: '1.5rem', background: 'rgba(14, 14, 26, 0.85)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.825rem', fontWeight: 600 }}>Среден Рейтинг</span>
              <IconPrismStar size={28} />
            </div>
            <h3 style={{ fontSize: '2rem', fontWeight: 800, margin: 0, color: 'var(--gold)' }}>
              {avgRating} ★
            </h3>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.4rem', display: 'block' }}>
              от общо {totalReviewsCount} отзива
            </span>
          </div>

          <div className="glow-border-card" style={{ padding: '1.5rem', background: 'rgba(14, 14, 26, 0.85)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.825rem', fontWeight: 600 }}>Активни Карти</span>
              <IconTipTapMark size={28} />
            </div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
              {waiters.length} / 30 Карти
            </h3>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.4rem', display: 'block' }}>
              Плащане: {subscription.nextBillingDate}
            </span>
          </div>
        </div>

        {/* TAB 1: ANALYTICS & TRENDS */}
        {activeTab === 'analytics' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1.5rem' }}>
              {/* TIPS TREND CHART */}
              <div className="glass-panel" style={{ padding: '1.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0 }}>Динамика на Бакшишите по Дни</h3>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Седмичен отчет в евро (€)</span>
                  </div>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--green)', background: 'rgba(16, 185, 129, 0.15)', padding: '0.2rem 0.6rem', borderRadius: '6px' }}>
                    +32% Уикенд Пик
                  </span>
                </div>

                {/* SVG Bar Chart */}
                <div style={{ width: '100%', height: '220px', display: 'flex', alignItems: 'flex-end', gap: '1rem', padding: '1rem 0 0.5rem', borderBottom: '1px solid var(--border-light)' }}>
                  {[
                    { day: 'Пон', val: 45, tips: '€45.00' },
                    { day: 'Втор', val: 60, tips: '€60.00' },
                    { day: 'Ср', val: 75, tips: '€75.00' },
                    { day: 'Четв', val: 90, tips: '€90.00' },
                    { day: 'Пет', val: 140, tips: '€140.00' },
                    { day: 'Съб', val: 185, tips: '€185.00' },
                    { day: 'Нед', val: 160, tips: '€160.00' }
                  ].map((item, idx) => (
                    <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', height: '100%', justifyContent: 'flex-end' }}>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>{item.tips}</span>
                      <div style={{
                        width: '100%',
                        maxWidth: '36px',
                        height: `${(item.val / 200) * 100}%`,
                        background: idx >= 4 ? 'linear-gradient(180deg, var(--green) 0%, #059669 100%)' : 'linear-gradient(180deg, var(--accent-purple) 0%, #6d28d9 100%)',
                        borderRadius: '8px 8px 4px 4px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
                        transition: 'all 0.3s ease'
                      }}></div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>{item.day}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* RATING BREAKDOWN & TOP TAGS */}
              <div className="glass-panel" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0 }}>Разпределение на Оценките</h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {[
                    { stars: '5 Звезди', pct: 86, color: 'var(--gold)' },
                    { stars: '4 Звезди', pct: 10, color: 'var(--green)' },
                    { stars: '3 Звезди', pct: 3, color: 'var(--accent-cyan)' },
                    { stars: '1-2 Звезди', pct: 1, color: 'var(--red)' }
                  ].map((row, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.8rem' }}>
                      <span style={{ width: '70px', color: 'var(--text-secondary)', fontWeight: 600 }}>{row.stars}</span>
                      <div style={{ flex: 1, height: '8px', background: 'rgba(255,255,255,0.06)', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ width: `${row.pct}%`, height: '100%', background: row.color, borderRadius: '4px' }}></div>
                      </div>
                      <span style={{ width: '40px', textAlign: 'right', fontWeight: 700, color: '#fff' }}>{row.pct}%</span>
                    </div>
                  ))}
                </div>

                <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '1rem' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Топ Похвали от Клиенти</span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {['⚡ Бързо обслужване (142)', '😊 Много усмихнат (98)', '🍷 Отлична препоръка (74)', '🧹 Чиста маса (52)'].map(t => (
                      <span key={t} style={{ fontSize: '0.75rem', padding: '0.25rem 0.65rem', background: 'rgba(139, 92, 246, 0.15)', border: '1px solid rgba(139, 92, 246, 0.3)', color: 'var(--accent-purple)', borderRadius: '6px' }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: DETAILED WAITERS & EDIT/DELETE SCOREBOARD */}
        {activeTab === 'waiters' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* WAITERS TOOLBAR: SORTING & ROLE FILTER */}
            <div className="glass-panel" style={{ padding: '1.25rem 1.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <ArrowUpDown size={18} color="var(--accent-purple)" />
                  <span style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-primary)' }}>Сортирай по:</span>
                </div>

                {(
                  [
                    { id: 'rating', label: '⭐ Рейтинг', color: 'var(--gold)' },
                    { id: 'tips', label: '💶 Събрани Бакшиши', color: 'var(--green)' },
                    { id: 'scans', label: '📱 NFC Сканирания', color: 'var(--accent-cyan)' },
                    { id: 'reviews', label: '💬 Брой Отзиви', color: 'var(--accent-purple)' }
                  ] as const
                ).map((sortOpt) => {
                  const isActive = waiterSortBy === sortOpt.id;
                  return (
                    <button
                      key={sortOpt.id}
                      type="button"
                      onClick={() => setWaiterSortBy(sortOpt.id as any)}
                      className={`btn ${isActive ? 'btn-primary' : 'btn-secondary'}`}
                      style={{ 
                        fontSize: '0.85rem', 
                        padding: '0.5rem 1.1rem', 
                        borderRadius: '10px',
                        fontWeight: isActive ? 800 : 500,
                        boxShadow: isActive ? `0 4px 15px rgba(139, 92, 246, 0.4)` : 'none',
                        border: isActive ? `1px solid ${sortOpt.color}` : '1px solid var(--border-light)'
                      }}
                    >
                      {sortOpt.label}
                    </button>
                  );
                })}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <button className="btn ios-glass-btn-primary" style={{ fontSize: '0.85rem', padding: '0.55rem 1.1rem' }} onClick={openCreateModal}>
                  <Plus size={16} /> Нов Сервитьор
                </button>
              </div>
            </div>

            {/* WAITERS DETAILED GRID WITH EDIT & DELETE */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
              {sortedWaiters.map((w, rankIdx) => (
                <div key={w.id} className="glow-border-card" style={{ padding: '1.75rem', background: 'rgba(14, 14, 26, 0.85)', display: 'flex', flexDirection: 'column', gap: '1.25rem', position: 'relative' }}>
                  
                  {/* Top Bar: Rank & Edit/Delete Action Icons */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', background: rankIdx === 0 ? 'rgba(245, 158, 11, 0.2)' : 'rgba(255,255,255,0.05)', border: rankIdx === 0 ? '1px solid rgba(245, 158, 11, 0.4)' : '1px solid var(--border-light)', padding: '0.2rem 0.65rem', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 800, color: rankIdx === 0 ? 'var(--gold)' : 'var(--text-muted)' }}>
                      {rankIdx === 0 ? '🏆 #1 ТОП СЕРВИТЬОР' : `#${rankIdx + 1} в Ранглистата`}
                    </div>

                    <div style={{ display: 'flex', gap: '0.35rem' }}>
                      <button 
                        className="btn btn-secondary" 
                        style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem' }} 
                        onClick={() => openEditModal(w)}
                        title="Редактирай Профила"
                      >
                        <Edit3 size={14} />
                      </button>
                      <button 
                        className="btn btn-secondary" 
                        style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem', color: 'var(--red)', border: '1px solid rgba(239, 68, 68, 0.3)' }} 
                        onClick={() => setDeleteConfirmWaiter(w)}
                        title="Премахни Сервитьора"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <img src={w.avatar} alt={w.name} style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--accent-purple)', boxShadow: '0 4px 15px rgba(0,0,0,0.5)' }} />
                    <div>
                      <h4 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0 }}>{w.name}</h4>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{w.role}</span>
                    </div>
                  </div>

                  {/* 4 DETAILED METRICS PER WAITER */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '14px', border: '1px solid var(--border-light)' }}>
                    <div>
                      <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.725rem', fontWeight: 600 }}>Средна Оценка</span>
                      <span style={{ fontWeight: 800, color: 'var(--gold)', fontSize: '1.1rem' }}>{w.rating} ★ <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 400 }}>({w.totalReviews})</span></span>
                    </div>

                    <div>
                      <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.725rem', fontWeight: 600 }}>Събрани Бакшиши</span>
                      <span style={{ fontWeight: 800, color: 'var(--green)', fontSize: '1.1rem' }}>€{w.totalTips.toFixed(2)}</span>
                    </div>

                    <div>
                      <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.725rem', fontWeight: 600 }}>NFC Сканирания</span>
                      <span style={{ fontWeight: 800, color: 'var(--accent-cyan)', fontSize: '1.1rem' }}>{w.scanCount || 0} сканирания</span>
                    </div>

                    <div>
                      <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.725rem', fontWeight: 600 }}>Google Пренасочвания</span>
                      <span style={{ fontWeight: 800, color: 'var(--accent-purple)', fontSize: '1.1rem' }}>{w.googleRedirects || 0} 5★</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                    <button 
                      type="button"
                      className="btn btn-secondary" 
                      style={{ 
                        flex: 1, 
                        fontSize: '0.825rem', 
                        padding: '0.6rem',
                        background: selectedWaiterDetails?.id === w.id ? 'var(--accent-purple)' : undefined,
                        color: selectedWaiterDetails?.id === w.id ? '#fff' : undefined
                      }}
                      onClick={() => setSelectedWaiterDetails(selectedWaiterDetails?.id === w.id ? null : w)}
                    >
                      <Eye size={16} /> {selectedWaiterDetails?.id === w.id ? 'Скрий Анализа ✕' : 'Детайлен Анализ'}
                    </button>
                    <button 
                      type="button"
                      className="btn btn-secondary" 
                      style={{ padding: '0.6rem 0.85rem' }}
                      onClick={() => setPrintQrWaiter(w)}
                      title="Принтирай QR Картон"
                    >
                      <QrCode size={16} />
                    </button>
                  </div>

                  {/* EXPANDABLE INLINE DETAILED ANALYSIS INSIDE THIS CARD */}
                  {selectedWaiterDetails?.id === w.id && (
                    <div style={{ 
                      marginTop: '1rem', 
                      paddingTop: '1.25rem', 
                      borderTop: '1px solid var(--border-light)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '1.25rem',
                      animation: 'fadeInUp 0.3s ease'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h5 style={{ fontSize: '1rem', fontWeight: 800, margin: 0, color: 'var(--accent-purple)' }}>
                          📊 Разширен Анализ за {w.name}
                        </h5>
                        <span style={{ fontSize: '0.75rem', color: 'var(--green)', background: 'rgba(16, 185, 129, 0.15)', padding: '0.15rem 0.55rem', borderRadius: '99px', fontWeight: 700 }}>
                          ● TipTap ID: {w.id}
                        </span>
                      </div>

                      {/* 4 EXTENDED METRICS INSIDE CARD */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem' }}>
                        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.85rem', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
                          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block' }}>NFC Сканирания</span>
                          <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>{w.scanCount || 0} сканирания</span>
                        </div>

                        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.85rem', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
                          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block' }}>Google Maps 5★</span>
                          <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--gold)' }}>{w.googleRedirects || 0} 5★</span>
                        </div>

                        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.85rem', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
                          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block' }}>Среден Бакшиш</span>
                          <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--green)' }}>€{(w.avgTipPerBill || 2.50).toFixed(2)}</span>
                        </div>

                        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.85rem', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
                          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block' }}>Смени</span>
                          <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff' }}>{w.shiftsCount || 15} смени</span>
                        </div>
                      </div>

                      {/* REVIEWS FOR THIS SPECIFIC WAITER */}
                      <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.85rem' }}>
                          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>💬 Коментари от Клиенти ({reviews.filter(r => r.waiterId === w.id).length}):</span>
                          
                          <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap' }}>
                            {(['all', 5, 4, 3] as const).map(starVal => (
                              <button
                                key={String(starVal)}
                                type="button"
                                onClick={() => setWaiterDetailStarFilter(starVal as any)}
                                className={`btn ${waiterDetailStarFilter === starVal ? 'btn-primary' : 'btn-secondary'}`}
                                style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem', borderRadius: '6px' }}
                              >
                                {starVal === 'all' ? 'Всички' : `${starVal} ★`}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', maxHeight: '260px', overflowY: 'auto' }}>
                          {reviews
                            .filter(r => r.waiterId === w.id)
                            .filter(r => waiterDetailStarFilter === 'all' || r.rating === waiterDetailStarFilter)
                            .sort((a, b) => {
                              if (waiterDetailSortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                              if (waiterDetailSortBy === 'oldest') return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
                              if (waiterDetailSortBy === 'rating_high') return b.rating - a.rating;
                              return 0;
                            })
                            .map(r => (
                              <div key={r.id} style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.02)', borderRadius: '10px', border: '1px solid var(--border-light)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                                  <div style={{ display: 'flex', gap: '2px' }}>
                                    {[...Array(r.rating)].map((_, i) => (
                                      <Star key={i} size={12} fill="var(--gold)" color="var(--gold)" />
                                    ))}
                                  </div>
                                  <span style={{ fontSize: '0.75rem', color: 'var(--green)', fontWeight: 700 }}>+€{r.tipAmount.toFixed(2)}</span>
                                </div>
                                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: '0 0 0.25rem' }}>"{r.comment}"</p>
                                <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{r.createdAt}</span>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: REVIEWS */}
        {activeTab === 'reviews' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="glass-panel" style={{ padding: '1.25rem 1.75rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0 }}>💬 Всички Коментари &amp; Отзиви от Клиенти</h3>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.04)', padding: '0.4rem 0.85rem', borderRadius: '12px', border: '1px solid var(--border-light)', width: '280px' }}>
                  <Search size={16} color="var(--text-muted)" />
                  <input 
                    type="text" 
                    placeholder="Търси по име или дума..." 
                    value={reviewSearchQuery}
                    onChange={(e) => setReviewSearchQuery(e.target.value)}
                    style={{ background: 'transparent', border: 'none', color: '#fff', outline: 'none', fontSize: '0.85rem', width: '100%' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderTop: '1px solid var(--border-light)', paddingTop: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', marginRight: '0.35rem' }}>Филтър Звезди:</span>
                  {(['all', 5, 4, 3, 2, 1] as const).map(starVal => (
                    <button
                      key={String(starVal)}
                      onClick={() => setReviewStarFilter(starVal as any)}
                      className={`btn ${reviewStarFilter === starVal ? 'btn-primary' : 'btn-secondary'}`}
                      style={{ fontSize: '0.78rem', padding: '0.35rem 0.75rem', borderRadius: '8px' }}
                    >
                      {starVal === 'all' ? 'Всички' : `${starVal} ★`}
                    </button>
                  ))}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>Подреди по:</span>
                  <select 
                    className="input-field" 
                    value={reviewSortBy}
                    onChange={(e) => setReviewSortBy(e.target.value as any)}
                    style={{ width: 'auto', padding: '0.35rem 0.85rem', fontSize: '0.825rem' }}
                  >
                    <option value="newest">🕒 Най-нови коментари</option>
                    <option value="rating_high">⭐ Най-висок рейтинг</option>
                    <option value="rating_low">⚠️ Най-нисък рейтинг</option>
                    <option value="tip_high">💶 Най-голям бакшиш</option>
                  </select>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {processedReviews.map(rev => (
                <div key={rev.id} className="glow-border-card" style={{ padding: '1.5rem', background: 'rgba(14, 14, 26, 0.85)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem' }}>
                      <span style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-primary)' }}>{rev.waiterName}</span>
                      <div style={{ display: 'flex', gap: '2px' }}>
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} size={15} fill="var(--gold)" color="var(--gold)" />
                        ))}
                      </div>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{rev.createdAt}</span>
                    </div>
                    <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: '0 0 0.5rem' }}>"{rev.comment}"</p>
                  </div>
                  {rev.tipAmount > 0 && (
                    <div style={{ textAlign: 'right', background: 'rgba(16, 185, 129, 0.1)', padding: '0.65rem 1rem', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.25)' }}>
                      <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--green)', display: 'block' }}>
                        +€{rev.tipAmount.toFixed(2)}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: PAYOUTS & TIP POOL */}
        {activeTab === 'payouts' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div className="glass-panel" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0 }}>Автоматични Изплащания (IBAN)</h3>
                <div>
                  <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>Банкова Сметка IBAN</label>
                  <input type="text" className="input-field" defaultValue="BG80 STSA 9230 0012 3456 78" />
                </div>
              </div>

              <div className="glass-panel" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0 }}>Разпределение на Бакшиша (Tip Pool)</h3>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
                    <span>Личен Сервитьор: <strong>{tipPoolSplit}%</strong></span>
                    <span>Фонд Кухня/Бар: <strong>{100 - tipPoolSplit}%</strong></span>
                  </div>
                  <input 
                    type="range" min="50" max="100" step="5"
                    className="modern-range-slider"
                    value={tipPoolSplit}
                    onChange={(e) => setTipPoolSplit(parseInt(e.target.value))}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: GOOGLE MAPS BOOSTER */}
        {activeTab === 'google' && (
          <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>Google Reviews Smart Redirect Конфигуратор</h3>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                Google Maps Линк за вашия ресторант
              </label>
              <input 
                type="text" 
                className="input-field" 
                value={googlePlaceId} 
                onChange={(e) => setGooglePlaceId(e.target.value)} 
              />
            </div>
          </div>
        )}

        {/* TAB 6: ORDERS & NFC CARD SLOT ASSIGNER */}
        {activeTab === 'orders' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>📦 Склад на NFC Картите &amp; Назначаване</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>Назначете или заменете сервитьор на всяка физическа карта.</p>
              </div>
              {onNavigateToCustomizer && (
                <button className="btn ios-glass-btn-primary" onClick={onNavigateToCustomizer}>
                  <Plus size={16} /> Поръчай Нова Карта
                </button>
              )}
            </div>

            {/* CARD SLOTS GRID */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
              {[
                { slotId: 'NFC-CARD-01', color: 'Матово Черна', assignedTo: waiters[0] || null },
                { slotId: 'NFC-CARD-02', color: 'Матово Черна', assignedTo: waiters[1] || null },
                { slotId: 'NFC-CARD-03', color: 'Матово Черна', assignedTo: waiters[2] || null },
                { slotId: 'NFC-CARD-04', color: 'Матово Черна', assignedTo: null }
              ].map((slot, idx) => (
                <div key={slot.slotId} className="glow-border-card" style={{ padding: '1.5rem', background: 'rgba(14, 14, 26, 0.85)', display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--accent-purple)', background: 'rgba(139, 92, 246, 0.15)', padding: '0.2rem 0.65rem', borderRadius: '99px' }}>
                      💳 Слот #{idx + 1} ({slot.color})
                    </span>
                    <span style={{ fontSize: '0.75rem', color: slot.assignedTo ? 'var(--green)' : 'var(--gold)', fontWeight: 700 }}>
                      {slot.assignedTo ? '● Активна' : '○ Свободна'}
                    </span>
                  </div>

                  {slot.assignedTo ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', background: 'rgba(255,255,255,0.03)', padding: '0.85rem', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
                      <img src={slot.assignedTo.avatar} alt={slot.assignedTo.name} style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }} />
                      <div>
                        <h5 style={{ fontSize: '1rem', fontWeight: 800, margin: 0 }}>{slot.assignedTo.name}</h5>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{slot.assignedTo.role}</span>
                      </div>
                    </div>
                  ) : (
                    <div style={{ padding: '1rem', border: '1px dashed var(--border-light)', borderRadius: '12px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                      Слотът е свободен за нов сервитьор
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto' }}>
                    <button 
                      className="btn btn-secondary" 
                      style={{ flex: 1, fontSize: '0.8rem', padding: '0.5rem' }}
                      onClick={() => {
                        if (slot.assignedTo) openEditModal(slot.assignedTo);
                        else openCreateModal();
                      }}
                    >
                      <RefreshCw size={14} /> {slot.assignedTo ? 'Смени Сервитьора' : 'Добави на този слот'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* ADD / EDIT WAITER FULL MODAL WITH PHOTO UPLOAD & PRESETS */}
      {showWaiterModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)', zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <form onSubmit={handleSaveWaiter} className="glass-panel" style={{ width: '100%', maxWidth: '460px', padding: '2.25rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', background: '#0c0c18' }}>
            <h3 style={{ margin: 0, fontSize: '1.35rem', fontWeight: 800 }}>
              {editingWaiter ? `Редактиране на ${editingWaiter.name}` : 'Добавяне на Нов Сервитьор'}
            </h3>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                Име и Фамилия
              </label>
              <input 
                type="text" 
                className="input-field" 
                required 
                value={formName} 
                onChange={(e) => setFormName(e.target.value)} 
                placeholder="Напр. Димитър Ангелов" 
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                Позиция / Роля
              </label>
              <select className="input-field" value={formRole} onChange={(e) => setFormRole(e.target.value)}>
                <option value="Сервитьор">Сервитьор</option>
                <option value="Старши Сервитьор">Старши Сервитьор</option>
                <option value="Барман">Барман / Сервитьор</option>
                <option value="Управител">Управител</option>
                <option value="Хостеса">Хостеса</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                Снимка / Аватар (Изберете или въведете URL)
              </label>
              <input 
                type="text" 
                className="input-field" 
                value={formAvatar} 
                onChange={(e) => setFormAvatar(e.target.value)} 
                placeholder="Въведете URL на снимка или изберете отдолу..." 
                style={{ marginBottom: '0.75rem' }}
              />

              {/* Avatar Presets Selection */}
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
                Препоръчани Професионални Аватари:
              </span>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {avatarPresets.map((imgUrl, i) => (
                  <img
                    key={i}
                    src={imgUrl}
                    alt={`Avatar ${i}`}
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      cursor: 'pointer',
                      border: formAvatar === imgUrl ? '3px solid var(--accent-purple)' : '2px solid transparent',
                      boxShadow: formAvatar === imgUrl ? '0 0 10px var(--accent-purple-glow)' : 'none'
                    }}
                    onClick={() => setFormAvatar(imgUrl)}
                  />
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.75rem' }}>
              <button type="button" className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setShowWaiterModal(false)}>Отказ</button>
              <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Запази Профила</button>
            </div>
          </form>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteConfirmWaiter && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)', zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div className="glass-panel" style={{ width: '100%', maxWidth: '400px', padding: '2rem', textAlign: 'center', background: '#0f0b12', border: '1px solid rgba(239, 68, 68, 0.4)' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.15)', color: 'var(--red)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
              <Trash2 size={28} />
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Премахване на Сервитьор?</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
              Сигурни ли сте, че искате да премахнете <strong>{deleteConfirmWaiter.name}</strong>? Слотът за NFC карта ще бъде освободен за нов служител.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setDeleteConfirmWaiter(null)}>Отказ</button>
              <button className="btn btn-primary" style={{ flex: 1, background: 'var(--red)' }} onClick={handleDeleteWaiterConfirmed}>
                Да, Премахни
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PRINT QR MODAL */}
      {printQrWaiter && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)', zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div className="glass-panel" style={{ width: '100%', maxWidth: '400px', padding: '2rem', textAlign: 'center', background: '#090912' }}>
            <h3 style={{ marginBottom: '1rem' }}>NFC &amp; QR Карта за Сервитьор</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              Принтирайте този код и го поставете в кожения сметник или държач.
            </p>
            
            <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '16px', display: 'inline-block', marginBottom: '1.5rem' }}>
              <img src={printQrWaiter.qrCodeUrl} alt="QR Code" style={{ width: '160px', height: '160px' }} />
              <h4 style={{ color: '#0f172a', marginTop: '0.5rem' }}>{printQrWaiter.name}</h4>
              <p style={{ color: '#64748b', fontSize: '0.75rem' }}>TipTap NFC ID: {printQrWaiter.id}</p>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setPrintQrWaiter(null)}>
                Затвори
              </button>
              <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => window.print()}>
                <Printer size={16} /> Принтирай
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
