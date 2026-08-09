import React from 'react';

export interface IconProps {
  size?: number;
  color?: string;
  fill?: string;
  className?: string;
  style?: React.CSSProperties;
}

// 1. HAND-DRAWN ORGANIC GLOWING STAR
export const CustomStar: React.FC<IconProps> = ({ size = 24, color = '#f59e0b', fill = 'none', className, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
    <path 
      d="M12 2.5C12.3 2.5 12.6 2.7 12.8 3.1L15.3 8.2C15.4 8.5 15.7 8.7 16.1 8.8L21.7 9.6C22.4 9.7 22.7 10.6 22.2 11.1L18.1 15.1C17.9 15.3 17.8 15.7 17.8 16L18.8 21.6C18.9 22.3 18.1 22.9 17.5 22.6L12.5 20C12.2 19.8 11.8 19.8 11.5 20L6.5 22.6C5.9 22.9 5.1 22.3 5.2 21.6L6.2 16C6.2 15.7 6.1 15.3 5.9 15.1L1.8 11.1C1.3 10.6 1.6 9.7 2.3 9.6L7.9 8.8C8.3 8.7 8.6 8.5 8.7 8.2L11.2 3.1C11.4 2.7 11.7 2.5 12 2.5Z" 
      stroke={color} 
      strokeWidth="2.2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
    <path d="M12 6L13.8 9.7M7.5 17.8L12 15.4" stroke={color} strokeWidth="1" opacity="0.4" strokeLinecap="round" />
  </svg>
);

// 2. HAND-DRAWN ORGANIC HEART
export const CustomHeart: React.FC<IconProps> = ({ size = 24, color = '#ef4444', fill = 'none', className, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
    <path 
      d="M12 20.8C11.6 20.8 11.2 20.6 10.9 20.3C8.1 17.7 5.7 15.4 3.9 13.3C2 11.1 1.2 9 1.5 6.9C1.9 4.1 4.1 2 6.9 2C8.7 2 10.4 2.9 11.5 4.3C12.1 3.2 13.2 2.4 14.5 2.1C15.2 1.9 16 1.9 16.8 2C19.6 2.4 21.8 4.7 22.1 7.5C22.4 9.6 21.5 11.7 19.5 13.9C17.7 15.9 15.3 18.2 12.6 20.6C12.4 20.7 12.2 20.8 12 20.8Z" 
      stroke={color} 
      strokeWidth="2.2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
    <path d="M6 6C6.8 5 8.2 4.5 9.5 5" stroke={color} strokeWidth="1.2" opacity="0.5" strokeLinecap="round" />
  </svg>
);

// 3. HAND-DRAWN CHECK CIRCLE
export const CustomCheckCircle: React.FC<IconProps> = ({ size = 24, color = '#10b981', fill = 'none', className, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
    <path 
      d="M21.5 11.8C21.6 16.8 17.7 21.1 12.7 21.5C7.4 21.9 2.8 17.8 2.5 12.5C2.1 7.2 6.2 2.6 11.5 2.3C13.2 2.2 14.9 2.6 16.4 3.4" 
      stroke={color} 
      strokeWidth="2.2" 
      strokeLinecap="round" 
    />
    <path 
      d="M8.5 11.8L11.5 14.8L21.2 4.8" 
      stroke={color} 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
  </svg>
);

// 4. HAND-DRAWN FLYING SEND / ROCKET VECTOR
export const CustomSend: React.FC<IconProps> = ({ size = 24, color = '#a855f7', className, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
    <path 
      d="M21.8 2.4C22.2 2.7 22.3 3.3 22 3.8L14.6 20.9C14.3 21.5 13.5 21.7 12.8 21.3C12.5 21.1 12.3 20.8 12.2 20.4L10 13.8L3.4 11.6C2.8 11.4 2.4 10.7 2.6 10.1C2.7 9.7 3 9.4 3.4 9.3L20.4 1.9C21 1.7 21.6 1.9 21.8 2.4Z" 
      stroke={color} 
      strokeWidth="2.2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
    <path 
      d="M10 13.8L21.5 2.5" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
    />
  </svg>
);

// 5. HAND-DRAWN EXECUTIVE SHIELD
export const CustomShieldCheck: React.FC<IconProps> = ({ size = 24, color = '#a855f7', className, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
    <path 
      d="M12 2.5L20 5.5V11.5C20 16.8 16.4 21.2 12 22.5C7.6 21.2 4 16.8 4 11.5V5.5L12 2.5Z" 
      stroke={color} 
      strokeWidth="2.2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
    <path 
      d="M9 11.5L11 13.8L15.5 9.2" 
      stroke={color} 
      strokeWidth="2.2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
  </svg>
);

// 6. HAND-DRAWN AWARD MEDAL
export const CustomAward: React.FC<IconProps> = ({ size = 24, color = '#f59e0b', className, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
    <circle cx="12" cy="9" r="6.5" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    <path d="M8.5 14.5L6.5 22L12 19L17.5 22L15.5 14.5" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="9" r="2.5" fill={color} opacity="0.3" />
  </svg>
);

// 7. HAND-DRAWN MESSAGE BUBBLE
export const CustomMessageSquare: React.FC<IconProps> = ({ size = 24, color = '#8b5cf6', className, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
    <path 
      d="M20.5 4.5C21.3 5.3 21.5 6.5 21.5 7.8V13.8C21.5 15.8 19.8 17.5 17.8 17.5H7.2L3.5 21V6.8C3.5 4.8 5.2 3.2 7.2 3.2H16.8C18.2 3.2 19.6 3.7 20.5 4.5Z" 
      stroke={color} 
      strokeWidth="2.2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
    <path d="M7.5 8.5H16.5M7.5 12.5H13.5" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// 8. HAND-DRAWN EXTERNAL LINK
export const CustomExternalLink: React.FC<IconProps> = ({ size = 24, color = '#a855f7', className, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
    <path d="M14 3H21V10" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10 14L20.5 3.5" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    <path d="M18 13V19C18 20.1 17.1 21 16 21H5C3.9 21 3 20.1 3 19V8C3 6.9 3.9 6 5 6H11" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// 9. HAND-DRAWN CREDIT CARD
export const CustomCreditCard: React.FC<IconProps> = ({ size = 24, color = '#6366f1', className, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
    <rect x="2.5" y="4.5" width="19" height="15" rx="3.5" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    <path d="M2.5 9.5H21.5" stroke={color} strokeWidth="2" />
    <rect x="6" y="13.5" width="4.5" height="3" rx="1" fill={color} opacity="0.6" />
    <path d="M15 15H17.5" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// 10. HAND-DRAWN MENU BURGER
export const CustomMenu: React.FC<IconProps> = ({ size = 24, color = '#fff', className, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
    <path d="M3.5 6.5C3.5 6.5 8 5.8 20.5 6.5" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    <path d="M3.5 12H17.5" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    <path d="M3.5 17.5C3.5 17.5 11 18.2 20.5 17.5" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

// 11. HAND-DRAWN CLOSE X
export const CustomX: React.FC<IconProps> = ({ size = 24, color = '#fff', className, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
    <path d="M5.5 5.5L18.5 18.5" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    <path d="M18.5 5.5L5.5 18.5" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

// 12. HAND-DRAWN SWOOSH ARROW RIGHT
export const CustomArrowRight: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
    <path d="M3.5 12C8 11.5 15 12 20 12" stroke={color} strokeWidth="2.4" strokeLinecap="round" />
    <path d="M14.5 6L20.5 12L14.5 18" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// 13. HAND-DRAWN DOLLAR SIGN
export const CustomDollarSign: React.FC<IconProps> = ({ size = 24, color = '#10b981', className, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
    <path d="M12 2V22" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    <path d="M17 7.5C17 7.5 15.5 5.5 12 5.5C8.5 5.5 7 7.5 7 9.5C7 13.5 17 11.5 17 15.5C17 18 14.5 19.5 12 19.5C8.5 19.5 7 17.5 7 17.5" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

// 14. HAND-DRAWN TRENDING UP CURVE
export const CustomTrendingUp: React.FC<IconProps> = ({ size = 24, color = '#10b981', className, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
    <path d="M3.5 17L9.5 11L13.5 15L20.5 7" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M15 7H20.5V12.5" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// 15. HAND-DRAWN SMARTPHONE
export const CustomSmartphone: React.FC<IconProps> = ({ size = 24, color = '#8b5cf6', className, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
    <rect x="5" y="2.5" width="14" height="19" rx="3" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    <path d="M10 6H14" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <circle cx="12" cy="18" r="1" fill={color} />
  </svg>
);

// 16. HAND-DRAWN LIGHTNING SPARK (ZAP)
export const CustomZap: React.FC<IconProps> = ({ size = 24, color = '#f59e0b', fill = 'none', className, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
    <path d="M13 2L4.5 13.5H12L11 22L19.5 10.5H12L13 2Z" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// 17. HAND-DRAWN BAR CHART
export const CustomBarChart3: React.FC<IconProps> = ({ size = 24, color = '#8b5cf6', className, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
    <path d="M3.5 20.5H20.5" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    <rect x="5" y="12" width="3.5" height="5.5" rx="1" fill={color} opacity="0.5" stroke={color} strokeWidth="1.5" />
    <rect x="10.25" y="8" width="3.5" height="9.5" rx="1" fill={color} opacity="0.75" stroke={color} strokeWidth="1.5" />
    <rect x="15.5" y="4" width="3.5" height="13.5" rx="1" fill={color} stroke={color} strokeWidth="1.5" />
  </svg>
);

// 18. HAND-DRAWN CHEVRON DOWN
export const CustomChevronDown: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
    <path d="M5.5 8.5L12 15L18.5 8.5" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// 19. HAND-DRAWN COFFEE CUP
export const CustomCoffee: React.FC<IconProps> = ({ size = 24, color = '#f59e0b', className, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
    <path d="M4 9H17V14C17 17 14.5 19 11.5 19H9.5C6.5 19 4 17 4 14V9Z" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    <path d="M17 10.5H19.5C20.9 10.5 22 11.6 22 13C22 14.4 20.9 15.5 19.5 15.5H17" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M7 3C7 4.5 8 5 8 6M11 3C11 4.5 12 5 12 6M15 3C15 4.5 16 5 16 6" stroke={color} strokeWidth="1.8" strokeLinecap="round" opacity="0.6" />
  </svg>
);

// 20. HAND-DRAWN UTENSILS
export const CustomUtensils: React.FC<IconProps> = ({ size = 24, color = '#ec4899', className, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
    <path d="M6 3V11M9 3V11M12 3V11M9 11V21M6 11C6 13 12 13 12 11" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M19 3C19 3 15 6 15 11H19V21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// 21. HAND-DRAWN COCKTAIL GLASS
export const CustomGlassWater: React.FC<IconProps> = ({ size = 24, color = '#06b6d4', className, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
    <path d="M4.5 4H19.5L18 19.5C18 20.9 16.9 22 15.5 22H8.5C7.1 22 6 20.9 6 19.5L4.5 4Z" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5.5 9C8 10 10.5 8 13 9.5C15.5 11 16.5 9.5 18.5 9" stroke={color} strokeWidth="1.8" opacity="0.6" strokeLinecap="round" />
  </svg>
);

// 22. HAND-DRAWN ROTATE 360
export const CustomRotateCw: React.FC<IconProps> = ({ size = 24, color = '#a855f7', className, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
    <path d="M21 4V9H16" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20.5 9C19.2 5.5 15.8 3 12 3C7 3 3 7 3 12C3 17 7 21 12 21C16.5 21 20.2 17.7 20.9 13.3" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

// 23. HAND-DRAWN LAYERS
export const CustomLayers: React.FC<IconProps> = ({ size = 24, color = '#6366f1', className, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2 12L12 17L22 12" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2 17L12 22L22 17" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// 24. HAND-DRAWN WIFI WAVES
export const CustomWifi: React.FC<IconProps> = ({ size = 24, color = '#10b981', className, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
    <path d="M2 8C5 5 19 5 22 8" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    <path d="M5 12C8 9.5 16 9.5 19 12" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    <path d="M8.5 16C10.5 14.5 13.5 14.5 15.5 16" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    <circle cx="12" cy="19.5" r="1.5" fill={color} />
  </svg>
);

// 25. HAND-DRAWN USERS TEAM
export const CustomUsers: React.FC<IconProps> = ({ size = 24, color = '#8b5cf6', className, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
    <circle cx="9" cy="7" r="4" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    <path d="M2 21C2 16.5 5 14 9 14C13 14 16 16.5 16 21" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    <path d="M16 3.5C17.5 4.2 18.5 5.7 18.5 7.5C18.5 9.3 17.5 10.8 16 11.5" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M18 14.5C20.5 15.5 22 17.5 22 21" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// 26. HAND-DRAWN PLUS ORB
export const CustomPlus: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
    <path d="M12 4.5V19.5" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    <path d="M4.5 12H19.5" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

// 27. HAND-DRAWN QR CODE
export const CustomQrCode: React.FC<IconProps> = ({ size = 24, color = '#06b6d4', className, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
    <rect x="3" y="3" width="7" height="7" rx="2" stroke={color} strokeWidth="2" />
    <rect x="5" y="5" width="3" height="3" fill={color} />
    <rect x="14" y="3" width="7" height="7" rx="2" stroke={color} strokeWidth="2" />
    <rect x="16" y="5" width="3" height="3" fill={color} />
    <rect x="3" y="14" width="7" height="7" rx="2" stroke={color} strokeWidth="2" />
    <rect x="5" y="16" width="3" height="3" fill={color} />
    <path d="M14 14H17V17H14V14Z" fill={color} />
    <path d="M18 18H21V21H18V18Z" fill={color} />
    <path d="M14 19H16V21H14V19Z" fill={color} />
    <path d="M19 14H21V16H19V14Z" fill={color} />
  </svg>
);

// 28. HAND-DRAWN PRINTER
export const CustomPrinter: React.FC<IconProps> = ({ size = 24, color = '#8b5cf6', className, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
    <path d="M6 9V3H18V9" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="3" y="9" width="18" height="9" rx="3" stroke={color} strokeWidth="2" />
    <path d="M6 15H18V21H6V15Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="#0f0e20" />
    <circle cx="18" cy="12" r="1" fill="#10b981" />
  </svg>
);

// 29. HAND-DRAWN DOWNLOAD
export const CustomDownload: React.FC<IconProps> = ({ size = 24, color = '#10b981', className, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
    <path d="M12 3V15M12 15L7 10M12 15L17 10" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3 19C3 19 7 21 12 21C17 21 21 19 21 19" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

// 30. HAND-DRAWN MAP PIN
export const CustomMapPin: React.FC<IconProps> = ({ size = 24, color = '#ef4444', className, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
    <path d="M12 2.5C7.3 2.5 3.5 6.3 3.5 11C3.5 16.5 12 22.5 12 22.5C12 22.5 20.5 16.5 20.5 11C20.5 6.3 16.7 2.5 12 2.5Z" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="10.5" r="3" stroke={color} strokeWidth="2" />
  </svg>
);

// 31. HAND-DRAWN SEARCH LENS
export const CustomSearch: React.FC<IconProps> = ({ size = 24, color = '#8b5cf6', className, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
    <circle cx="11" cy="11" r="7.5" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    <path d="M16.5 16.5L21.5 21.5" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

// 32. HAND-DRAWN FILTER FUNNEL
export const CustomFilter: React.FC<IconProps> = ({ size = 24, color = '#a855f7', className, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
    <path d="M3 4.5H21L14 12.5V19.5L10 21.5V12.5L3 4.5Z" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// 33. HAND-DRAWN ARROW UP DOWN
export const CustomArrowUpDown: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
    <path d="M7 3V21M7 3L3 7M7 3L11 7" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M17 21V3M17 21L13 17M17 21L21 17" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// 34. HAND-DRAWN EYE
export const CustomEye: React.FC<IconProps> = ({ size = 24, color = '#06b6d4', className, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
    <path d="M2.5 12C4.5 7.5 8 5 12 5C16 5 19.5 7.5 21.5 12C19.5 16.5 16 19 12 19C8 19 4.5 16.5 2.5 12Z" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="12" r="3.5" stroke={color} strokeWidth="2" />
  </svg>
);

// 35. HAND-DRAWN TRASH BIN
export const CustomTrash2: React.FC<IconProps> = ({ size = 24, color = '#ef4444', className, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
    <path d="M3 6H21" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    <path d="M19 6L18 19.5C18 20.9 16.9 22 15.5 22H8.5C7.1 22 6 20.9 6 19.5L5 6" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    <path d="M9 6V3.5C9 2.7 9.7 2 10.5 2H13.5C14.3 2 15 2.7 15 3.5V6" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M10 11V17M14 11V17" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

// 36. HAND-DRAWN EDIT PENCIL
export const CustomEdit3: React.FC<IconProps> = ({ size = 24, color = '#a855f7', className, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
    <path d="M12 20H21" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    <path d="M16.5 3.5C17.3 2.7 18.6 2.7 19.4 3.5C20.2 4.3 20.2 5.6 19.4 6.4L7.5 18.3L3 19.5L4.2 15L16.5 3.5Z" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// 37. HAND-DRAWN IMAGE FRAME
export const CustomImage: React.FC<IconProps> = ({ size = 24, color = '#8b5cf6', className, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
    <rect x="3" y="3" width="18" height="18" rx="3.5" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    <circle cx="8.5" cy="8.5" r="2" fill={color} />
    <path d="M21 15L16 10L5 21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// 38. HAND-DRAWN UPLOAD
export const CustomUpload: React.FC<IconProps> = ({ size = 24, color = '#10b981', className, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
    <path d="M12 15V3M12 3L7 8M12 3L17 8" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3 19C3 19 7 21 12 21C17 21 21 19 21 19" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

// 39. HAND-DRAWN REFRESH SYNC
export const CustomRefreshCw: React.FC<IconProps> = ({ size = 24, color = '#06b6d4', className, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
    <path d="M21 3V8H16" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3 21V16H8" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20.5 8C19.2 4.5 15.8 2 12 2C6.5 2 2 6.5 2 12C2 13.5 2.3 14.9 2.9 16.2" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    <path d="M3.5 16C4.8 19.5 8.2 22 12 22C17.5 22 22 17.5 22 12C22 10.5 21.7 9.1 21.1 7.8" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

// 40. 3D HOLOGRAPHIC NFC CHIP
export const IconNfcChip: React.FC<IconProps> = ({ size = 24, className, style }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
    <defs>
      <linearGradient id="nfcGrad1" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
        <stop stopColor="#8b5cf6" />
        <stop offset="1" stopColor="#06b6d4" />
      </linearGradient>
      <linearGradient id="nfcGrad2" x1="0" y1="0" x2="32" y2="0" gradientUnits="userSpaceOnUse">
        <stop stopColor="#f59e0b" />
        <stop offset="1" stopColor="#10b981" />
      </linearGradient>
    </defs>
    <rect x="3" y="5" width="26" height="22" rx="6" fill="#0f0e20" stroke="url(#nfcGrad1)" strokeWidth="2" />
    <path d="M10 16A6 6 0 0 1 16 10" stroke="url(#nfcGrad2)" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M7 16A9 9 0 0 1 16 7" stroke="url(#nfcGrad1)" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 2" />
    <path d="M13 16A3 3 0 0 1 16 13" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    <circle cx="16" cy="16" r="2" fill="url(#nfcGrad2)" />
  </svg>
);

// 41. EXCLUSIVE DIAMOND-HEXAGON LOGO VECTOR
export const IconTipTapMark: React.FC<IconProps> = ({ size = 24, className, style }) => (
  <svg width={size} height={size} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
    <defs>
      <linearGradient id="tipGrad" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
        <stop stopColor="#a855f7" />
        <stop offset="0.5" stopColor="#ec4899" />
        <stop offset="1" stopColor="#3b82f6" />
      </linearGradient>
    </defs>
    <path d="M18 2L32 10V26L18 34L4 26V10L18 2Z" fill="#121026" stroke="url(#tipGrad)" strokeWidth="2.5" />
    <path d="M18 8L26 14L18 28L10 14L18 8Z" fill="url(#tipGrad)" opacity="0.85" />
    <circle cx="18" cy="18" r="3.5" fill="#fff" />
  </svg>
);

// 42. TITANIUM CRYSTALLINE PRISM STAR VECTOR
export const IconPrismStar: React.FC<IconProps & { fill?: string }> = ({ size = 24, fill = 'url(#starGrad)', className, style }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
    <defs>
      <linearGradient id="starGrad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
        <stop stopColor="#fbbf24" />
        <stop offset="1" stopColor="#d97706" />
      </linearGradient>
    </defs>
    <path d="M16 2L19.5 10.5L28 12L21.5 18L23.5 27L16 22L8.5 27L10.5 18L4 12L12.5 10.5L16 2Z" fill={fill} stroke="#f59e0b" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M16 2V22M28 12L16 22M4 12L16 22" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
  </svg>
);

// 43. CYBERNETIC HOLOGRAPHIC BAR GRAPH
export const IconCyberAnalytics: React.FC<IconProps> = ({ size = 24, className, style }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
    <defs>
      <linearGradient id="barGrad1" x1="0" y1="32" x2="0" y2="0" gradientUnits="userSpaceOnUse">
        <stop stopColor="#8b5cf6" />
        <stop offset="1" stopColor="#c084fc" />
      </linearGradient>
      <linearGradient id="barGrad2" x1="0" y1="32" x2="0" y2="0" gradientUnits="userSpaceOnUse">
        <stop stopColor="#10b981" />
        <stop offset="1" stopColor="#34d399" />
      </linearGradient>
    </defs>
    <rect x="4" y="16" width="6" height="12" rx="2" fill="url(#barGrad1)" />
    <rect x="13" y="10" width="6" height="18" rx="2" fill="url(#barGrad1)" />
    <rect x="22" y="5" width="6" height="23" rx="2" fill="url(#barGrad2)" />
    <path d="M5 13L13 7L24 2" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// 44. EXECUTIVE VIP SHIELD BADGE VECTOR
export const IconVipWaiters: React.FC<IconProps> = ({ size = 24, className, style }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
    <defs>
      <linearGradient id="vipGrad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
        <stop stopColor="#6366f1" />
        <stop offset="1" stopColor="#a855f7" />
      </linearGradient>
    </defs>
    <path d="M16 3L27 7V16C27 23 16 29 16 29C16 29 5 23 5 16V7L16 3Z" fill="#111026" stroke="url(#vipGrad)" strokeWidth="2" />
    <path d="M11 10L16 14L21 10" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// 45. FUTURISTIC EURO CURRENCY SYMBOL CHIP
export const IconEuroChip: React.FC<IconProps> = ({ size = 24, className, style }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
    <defs>
      <linearGradient id="euroGrad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
        <stop stopColor="#10b981" />
        <stop offset="1" stopColor="#059669" />
      </linearGradient>
    </defs>
    <circle cx="16" cy="16" r="13" fill="#0b1712" stroke="url(#euroGrad)" strokeWidth="2" />
    <path d="M21 10C19.5 8.5 17.5 8 15.5 8C11.5 8 8.5 11 8.5 16C8.5 21 11.5 24 15.5 24C17.5 24 19.5 23.5 21 22" stroke="url(#euroGrad)" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M7 14H17M7 18H17" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// 46. SMART LOCATION RADAR TARGET
export const IconSmartRadar: React.FC<IconProps> = ({ size = 24, className, style }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
    <defs>
      <linearGradient id="radarGrad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
        <stop stopColor="#ef4444" />
        <stop offset="1" stopColor="#f59e0b" />
      </linearGradient>
    </defs>
    <path d="M16 3C10.5 3 6 7.5 6 13C6 20.5 16 29 16 29C16 29 26 20.5 26 13C26 7.5 21.5 3 16 3Z" fill="#1a0c10" stroke="url(#radarGrad)" strokeWidth="2" />
    <circle cx="16" cy="13" r="5" fill="url(#radarGrad)" />
  </svg>
);

// 47. CYBER MATRIX QR CODE CHIP
export const IconCyberQr: React.FC<IconProps> = ({ size = 24, className, style }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
    <rect x="3" y="3" width="10" height="10" rx="3" fill="#121028" stroke="#8b5cf6" strokeWidth="2" />
    <rect x="6" y="6" width="4" height="4" fill="#06b6d4" />
    <rect x="19" y="3" width="10" height="10" rx="3" fill="#121028" stroke="#8b5cf6" strokeWidth="2" />
    <rect x="22" y="6" width="4" height="4" fill="#06b6d4" />
    <rect x="3" y="19" width="10" height="10" rx="3" fill="#121028" stroke="#8b5cf6" strokeWidth="2" />
    <rect x="6" y="22" width="4" height="4" fill="#06b6d4" />
  </svg>
);

// 48. GEOMETRIC ADD USER ORB
export const IconAddUserOrb: React.FC<IconProps> = ({ size = 24, className, style }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
    <circle cx="14" cy="11" r="5" stroke="#8b5cf6" strokeWidth="2" fill="#121028" />
    <path d="M4 27C4 22 8.5 18 14 18C16 18 17.8 18.5 19.3 19.4" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" />
    <circle cx="24" cy="22" r="6" fill="#10b981" />
    <path d="M24 19V25M21 22H27" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export interface QrProps {
  size?: number;
  color?: string;
  bgColor?: string;
  logoCenter?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

// 49. HYPER-REALISTIC VECTOR 2D QR CODE MATRIX COMPONENT
export const RealisticQrCode: React.FC<QrProps> = ({ 
  size = 120, 
  color = '#0f172a', 
  bgColor = '#ffffff', 
  logoCenter = true,
  className, 
  style 
}) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className} 
      style={{ display: 'block', borderRadius: '8px', ...style }}
    >
      {/* Background quiet zone */}
      <rect width="100" height="100" fill={bgColor} rx="6" />

      {/* TOP-LEFT FINDER PATTERN */}
      <path d="M 6,6 H 34 V 34 H 6 Z M 10,10 V 30 H 30 V 10 Z" fill={color} fillRule="evenodd" />
      <rect x="14" y="14" width="12" height="12" rx="1.5" fill={color} />

      {/* TOP-RIGHT FINDER PATTERN */}
      <path d="M 66,6 H 94 V 34 H 66 Z M 70,10 V 30 H 90 V 10 Z" fill={color} fillRule="evenodd" />
      <rect x="74" y="14" width="12" height="12" rx="1.5" fill={color} />

      {/* BOTTOM-LEFT FINDER PATTERN */}
      <path d="M 6,66 H 34 V 94 H 6 Z M 10,70 V 90 H 30 V 70 Z" fill={color} fillRule="evenodd" />
      <rect x="14" y="74" width="12" height="12" rx="1.5" fill={color} />

      {/* BOTTOM-RIGHT ALIGNMENT PATTERN */}
      <path d="M 68,68 H 88 V 88 H 68 Z M 72,72 V 84 H 84 V 72 Z" fill={color} fillRule="evenodd" />
      <rect x="76" y="76" width="4" height="4" fill={color} />

      {/* TIMING PATTERNS */}
      <path d="M 38,18 h4 v4 h-4 z M 46,18 h4 v4 h-4 z M 54,18 h4 v4 h-4 z M 18,38 h4 v4 h-4 z M 18,46 h4 v4 h-4 z M 18,54 h4 v4 h-4 z" fill={color} />

      {/* HIGH-DENSITY REALISTIC DATA MODULE MATRIX */}
      <path d="
        M 38,6 h4 v4 h-4 z M 46,6 h8 v4 h-8 z M 58,6 h4 v4 h-4 z
        M 38,10 h4 v4 h-4 z M 50,10 h4 v4 h-4 z M 58,10 h4 v8 h-4 z
        M 38,22 h12 v4 h-12 z M 54,22 h8 v4 h-8 z
        M 38,26 h4 v4 h-4 z M 46,26 h4 v4 h-4 z M 58,26 h4 v4 h-4 z
        M 6,38 h4 v4 h-4 z M 14,38 h4 v4 h-4 z M 26,38 h8 v4 h-8 z M 38,38 h4 v4 h-4 z M 46,38 h12 v4 h-12 z M 66,38 h4 v4 h-4 z M 74,38 h4 v4 h-4 z M 86,38 h8 v4 h-8 z
        M 6,42 h8 v4 h-8 z M 18,42 h4 v4 h-4 z M 30,42 h4 v4 h-4 z M 42,42 h8 v4 h-8 z M 54,42 h4 v4 h-4 z M 66,42 h4 v4 h-4 z M 78,42 h4 v4 h-4 z M 86,42 h4 v4 h-4 z
        M 6,46 h4 v4 h-4 z M 14,46 h8 v4 h-8 z M 26,46 h4 v4 h-4 z M 34,46 h4 v4 h-4 z M 66,46 h8 v4 h-8 z M 78,46 h8 v4 h-8 z M 90,46 h4 v4 h-4 z
        M 6,54 h4 v4 h-4 z M 14,54 h4 v4 h-4 z M 22,54 h12 v4 h-12 z M 38,54 h8 v4 h-8 z M 66,54 h4 v4 h-4 z M 74,54 h8 v4 h-8 z M 86,54 h8 v4 h-8 z
        M 6,58 h8 v4 h-8 z M 18,58 h4 v4 h-8 z M 26,58 h8 v4 h-8 z M 38,58 h4 v4 h-4 z M 46,58 h4 v4 h-4 z M 66,58 h4 v4 h-4 z M 74,58 h4 v4 h-4 z M 82,58 h12 v4 h-12 z
        M 38,62 h4 v4 h-4 z M 46,62 h8 v4 h-8 z M 58,62 h4 v4 h-4 z
        M 38,66 h12 v4 h-12 z M 54,66 h4 v4 h-4 z M 62,66 h4 v4 h-4 z
        M 38,70 h4 v4 h-4 z M 46,70 h4 v4 h-4 z M 54,70 h8 v4 h-8 z M 90,70 h4 v4 h-4 z
        M 38,74 h8 v4 h-8 z M 50,74 h4 v4 h-4 z M 58,74 h4 v4 h-4 z M 90,74 h4 v8 h-4 z
        M 38,78 h4 v4 h-4 z M 46,78 h4 v4 h-4 z M 54,78 h4 v4 h-4 z M 62,78 h4 v4 h-4 z
        M 38,82 h12 v4 h-12 z M 54,82 h8 v4 h-8 z M 90,84 h4 v4 h-4 z
        M 38,86 h4 v4 h-4 z M 46,86 h4 v4 h-4 z M 54,86 h4 v4 h-4 z M 62,86 h4 v4 h-4 z M 90,90 h4 v4 h-4 z
        M 38,90 h8 v4 h-8 z M 50,90 h4 v4 h-4 z M 58,90 h8 v4 h-8 z M 70,90 h16 v4 h-16 z
      " fill={color} />

      {/* OPTIONAL CENTER RESTAURANT LOGO EMBLEM BADGE */}
      {logoCenter && (
        <g>
          <rect x="40" y="40" width="20" height="20" rx="4" fill={bgColor} stroke={color} strokeWidth="1.5" />
          <path d="M 46,50 L 50,45 L 54,50 L 50,55 Z" fill="#f59e0b" />
          <circle cx="50" cy="50" r="2" fill={color} />
        </g>
      )}
    </svg>
  );
};

// 20. TIPTAP PURE BRAND VECTOR SYMBOL (NO BACKGROUND BOX - LIKE TOP TECH BRANDS)
export const TipTapBrandSymbol: React.FC<IconProps> = ({ size = 30, className, style }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={{ filter: 'drop-shadow(0 0 10px rgba(139, 92, 246, 0.6))', ...style }}>
    <defs>
      <linearGradient id="tiptapBrandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#a78bfa" />
        <stop offset="50%" stopColor="#8b5cf6" />
        <stop offset="100%" stopColor="#38bdf8" />
      </linearGradient>
    </defs>
    {/* Inner Glowing Core */}
    <circle cx="16" cy="16" r="3.5" fill="url(#tiptapBrandGrad)" />
    {/* Concentric Signal Arch 1 */}
    <path 
      d="M10 10C11.6 8.4 13.7 7.5 16 7.5C18.3 7.5 20.4 8.4 22 10" 
      stroke="url(#tiptapBrandGrad)" 
      strokeWidth="2.8" 
      strokeLinecap="round" 
    />
    <path 
      d="M10 22C11.6 23.6 13.7 24.5 16 24.5C18.3 24.5 20.4 23.6 22 22" 
      stroke="url(#tiptapBrandGrad)" 
      strokeWidth="2.8" 
      strokeLinecap="round" 
    />
    {/* Outer Signal Arch 2 */}
    <path 
      d="M6 6C8.6 3.4 12.1 2 16 2C19.9 2 23.4 3.4 26 6" 
      stroke="url(#tiptapBrandGrad)" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      opacity="0.75"
    />
    <path 
      d="M6 26C8.6 28.6 12.1 30 16 30C19.9 30 23.4 28.6 26 26" 
      stroke="url(#tiptapBrandGrad)" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      opacity="0.75"
    />
  </svg>
);

// 29. OFFICIAL GOOGLE SVG LOGO ICON
export const GoogleLogoIcon: React.FC<IconProps> = ({ size = 20, className, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
    <path fillRule="evenodd" clipRule="evenodd" d="M23.54 12.28c0-.85-.07-1.68-.22-2.48H12v4.69h6.47c-.28 1.48-1.12 2.73-2.38 3.58v2.98h3.86c2.26-2.09 3.59-5.17 3.59-8.77z" fill="#4285F4"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-2.98c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.08C3.26 21.3 7.31 24 12 24z" fill="#34A853"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M5.27 14.31A7.16 7.16 0 014.89 12c0-.8.14-1.58.38-2.31V6.61H1.29A11.96 11.96 0 000 12c0 1.92.45 3.74 1.29 5.39l3.98-3.08z" fill="#FBBC05"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.61l3.98 3.08c.95-2.85 3.6-4.94 6.73-4.94z" fill="#EA4335"/>
  </svg>
);

// 30. OFFICIAL APPLE SVG LOGO ICON
export const AppleLogoIcon: React.FC<IconProps> = ({ size = 20, color = "#ffffff", className, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.33c.66-.8 1.11-1.92.99-3.03-.96.04-2.12.64-2.8 1.44-.6.7-1.13 1.83-.99 2.92 1.07.08 2.14-.53 2.8-1.33z" />
  </svg>
);

// 31. HAND-DRAWN ANALYTICS / BOSS CONTROL (purple, sketchy)
export const IconHandChart: React.FC<IconProps> = ({ size = 24, color = '#a78bfa', className, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
    <path d="M4.5 3.4C4.2 7.2 4.3 15.6 4.4 20.1C8.7 20.4 15.9 20.3 20.6 20.2" stroke={color} strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8.3 20C8.4 18.1 8.2 16.4 8.3 14.3" stroke={color} strokeWidth="2.6" strokeLinecap="round" />
    <path d="M12.4 20.1C12.5 17 12.3 13.6 12.4 10.4" stroke={color} strokeWidth="2.6" strokeLinecap="round" />
    <path d="M16.5 20C16.6 15.4 16.4 10.7 16.5 6.6" stroke={color} strokeWidth="2.6" strokeLinecap="round" />
    <path d="M7 12.8C10.4 8.6 13.8 5.9 17.4 4.2" stroke={color} strokeWidth="1.1" opacity="0.4" strokeLinecap="round" strokeDasharray="0.5 2.6" />
  </svg>
);

// 32. HAND-DRAWN SHIELD WITH STAR (protection + Google 5★, purple)
export const IconHandShieldStar: React.FC<IconProps> = ({ size = 24, color = '#a78bfa', className, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
    <path d="M12 2.7C12 2.7 8 4.7 4.4 5.2C4.1 9.3 4.1 15.6 12 21.3C19.9 15.6 19.9 9.3 19.6 5.2C16 4.7 12 2.7 12 2.7Z" stroke={color} strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 7.4C12.1 7.4 12.2 7.5 12.3 7.7L13.1 9.4C13.1 9.5 13.3 9.6 13.4 9.7L15.3 9.9C15.6 9.9 15.7 10.3 15.5 10.5L14.1 11.9C14 12 13.9 12.1 14 12.3L14.3 14.2C14.4 14.4 14.1 14.7 13.9 14.5L12.2 13.6C12.1 13.5 11.9 13.5 11.8 13.6L10.1 14.5C9.9 14.7 9.6 14.4 9.7 14.2L10 12.3C10.1 12.1 10 12 9.9 11.9L8.5 10.5C8.3 10.3 8.4 9.9 8.7 9.9L10.6 9.7C10.7 9.6 10.9 9.5 10.9 9.4L11.7 7.7C11.8 7.5 11.9 7.4 12 7.4Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6.5 6.4C7.6 6 8.9 5.6 10 5" stroke={color} strokeWidth="1" opacity="0.4" strokeLinecap="round" />
  </svg>
);

// 33. HAND-DRAWN TIP CARD WITH HEART (team motivation / online tips, purple)
export const IconHandTipCard: React.FC<IconProps> = ({ size = 24, color = '#a78bfa', className, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
    <path d="M3.3 7.2C7.3 6.8 16.9 6.7 20.7 7.1C21.1 10.1 21.1 14 20.7 16.9C16.8 17.3 7.1 17.2 3.3 16.8C2.9 13.9 2.9 10.1 3.3 7.2Z" stroke={color} strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3.6 10.2C7.6 10.4 16.8 10.4 20.5 10.2" stroke={color} strokeWidth="1.6" strokeLinecap="round" opacity="0.75" />
    <path d="M12 15.6C11.9 15.6 11.8 15.5 11.7 15.4C10.7 14.5 9.9 13.8 9.4 13.1C9 12.6 8.9 12 9.1 11.5C9.4 10.8 10.2 10.5 10.9 10.8C11.3 11 11.7 11.3 12 11.7C12.3 11.3 12.7 11 13.1 10.8C13.8 10.5 14.6 10.8 14.9 11.5C15.1 12 15 12.6 14.6 13.1C14.1 13.8 13.3 14.5 12.3 15.4C12.2 15.5 12.1 15.6 12 15.6Z" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
