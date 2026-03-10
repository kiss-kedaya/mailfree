/**
 * Lucide Icons 初始化脚本
 * 用于在页面加载后渲染所有 Lucide 图标
 */

(function() {
  'use strict';
  
  // 图标映射表：emoji -> Lucide icon name
  const EMOJI_TO_LUCIDE_MAP = {
    // 邮件相关
    '📧': 'mail',
    '📨': 'inbox',
    '📩': 'mail-open',
    '📤': 'send',
    '📥': 'download',
    '📬': 'mail-check',
    '📭': 'mail-x',
    
    // 文件操作
    '📋': 'clipboard',
    '📄': 'file-text',
    '📁': 'folder',
    '📂': 'folder-open',
    '🗑️': 'trash-2',
    
    // 用户和安全
    '👤': 'user',
    '👥': 'users',
    '🔐': 'lock',
    '🔓': 'unlock',
    '🔑': 'key',
    '🔒': 'lock',
    
    // 操作
    '✏️': 'edit',
    '📝': 'file-edit',
    '🔄': 'refresh-cw',
    '🔁': 'repeat',
    '📍': 'map-pin',
    '📌': 'pin',
    
    // 导航
    '🏠': 'home',
    '🔗': 'external-link',
    '🚪': 'log-out',
    '🚀': 'rocket',
    '👋': 'hand',
    
    // 状态
    '✅': 'check-circle',
    '❌': 'x-circle',
    '🚫': 'ban',
    '⚠️': 'alert-triangle',
    'ℹ️': 'info',
    
    // 搜索和筛选
    '🔍': 'search',
    '🔎': 'search',
    
    // 收藏和标记
    '⭐': 'star',
    '☆': 'star',
    '💡': 'lightbulb',
    
    // 设置
    '⚙️': 'settings',
    '🛠️': 'tool',
    
    // 包裹和存储
    '📦': 'package',
    
    // 网络
    '🌐': 'globe',
    
    // 视图
    '👁️': 'eye',
    '📊': 'bar-chart-2',
    
    // 其他
    '📏': 'ruler',
    '🎲': 'shuffle',
    '💥': 'zap',
    '🔔': 'bell'
  };
  
  /**
   * 将 emoji 字符串转换为 Lucide 图标 HTML
   * @param {string} text - 包含 emoji 的文本
   * @returns {string} - 替换后的 HTML
   */
  function replaceEmojiWithIcon(text) {
    let result = text;
    
    for (const [emoji, iconName] of Object.entries(EMOJI_TO_LUCIDE_MAP)) {
      const regex = new RegExp(emoji, 'g');
      result = result.replace(regex, `<i data-lucide="${iconName}"></i>`);
    }
    
    return result;
  }
  
  /**
   * 初始化页面上的所有 Lucide 图标
   */
  function initLucideIcons() {
    if (typeof lucide !== 'undefined' && lucide.createIcons) {
      try {
        lucide.createIcons();
        console.log('[Lucide] Icons initialized successfully');
      } catch (error) {
        console.error('[Lucide] Failed to initialize icons:', error);
      }
    } else {
      console.warn('[Lucide] Lucide library not loaded');
    }
  }
  
  /**
   * 替换 DOM 元素中的所有 emoji 为图标
   * @param {Element} element - DOM 元素
   */
  function replaceEmojisInElement(element) {
    const walker = document.createTreeWalker(
      element,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );
    
    const textNodes = [];
    while (walker.nextNode()) {
      textNodes.push(walker.currentNode);
    }
    
    textNodes.forEach(node => {
      if (node.parentElement) {
        const text = node.textContent;
        const hasEmoji = /[\u{1F300}-\u{1F9FF}]/u.test(text);
        
        if (hasEmoji) {
          const newHtml = replaceEmojiWithIcon(text);
          const span = document.createElement('span');
          span.innerHTML = newHtml;
          node.parentElement.replaceChild(span, node);
        }
      }
    });
  }
  
  // 自动初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLucideIcons);
  } else {
    // DOM 已加载，立即初始化
    setTimeout(initLucideIcons, 0);
  }
  
  // 暴露到全局
  window.LucideIconHelper = {
    init: initLucideIcons,
    replaceEmoji: replaceEmojiWithIcon,
    replaceInElement: replaceEmojisInElement,
    EMOJI_MAP: EMOJI_TO_LUCIDE_MAP,
    // 刷新所有图标（用于动态内容加载后）
    refresh: initLucideIcons
  };
  
  // 全局函数：刷新图标（简短名称，便于调用）
  window.refreshIcons = initLucideIcons;
  
})();
