/**
 * 邮箱渲染模块
 * @module modules/mailboxes/render
 */

/**
 * 格式化时间
 * @param {string} ts - 时间戳
 * @returns {string}
 */
export function formatTime(ts) {
  if (!ts) return '';
  const d = new Date(String(ts).replace(' ', 'T') + 'Z');
  return new Intl.DateTimeFormat('zh-CN', {
    timeZone: 'Asia/Shanghai', hour12: false,
    year: 'numeric', month: 'numeric', day: 'numeric',
    hour: '2-digit', minute: '2-digit', second: '2-digit'
  }).format(d);
}

/**
 * HTML 转义
 * @param {string} str - 字符串
 * @returns {string}
 */
export function escapeHtml(str) {
  if (!str) return '';
  return String(str).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

/**
 * 生成骨架屏卡片
 * @returns {string}
 */
export function createSkeletonCard() {
  return `<div class="skeleton-card"><div class="skeleton-line title"></div><div class="skeleton-line subtitle"></div><div class="skeleton-line text"></div><div class="skeleton-line time"></div></div>`;
}

/**
 * 生成骨架屏列表项
 * @returns {string}
 */
export function createSkeletonListItem() {
  return `<div class="skeleton-list-item"><div class="skeleton-line skeleton-pin"></div><div class="skeleton-content"><div class="skeleton-line title"></div><div class="skeleton-line subtitle"></div></div><div class="skeleton-actions"><div class="skeleton-line"></div><div class="skeleton-line"></div></div></div>`;
}

/**
 * 生成骨架屏内容
 * @param {string} view - 视图模式
 * @param {number} count - 数量
 * @returns {string}
 */
export function generateSkeleton(view = 'grid', count = 8) {
  return Array(count).fill(null).map(() => view === 'grid' ? createSkeletonCard() : createSkeletonListItem()).join('');
}

/**
 * 渲染网格卡片（使用原始 CSS 类名）
 * 操作按钮：复制、置顶、设置转发、收藏（2x2 布局）
 * 点击卡片跳转邮箱
 * @param {object} m - 邮箱数据
 * @returns {string}
 */
export function renderCard(m) {
  const addr = escapeHtml(m.address);
  const time = formatTime(m.created_at);
  const forward = m.forward_to ? escapeHtml(m.forward_to) : '';
  
  return `
    <div class="mailbox-card" data-address="${addr}" data-id="${m.id}" data-action="jump">
      ${m.is_pinned ? '<div class="pin-badge" title="置顶"><i data-lucide="pin"></i></div>' : ''}
      ${m.is_favorite ? '<div class="favorite-badge" title="收藏"><i data-lucide="star"></i></div>' : ''}
      ${forward ? `<div class="forward-badge" title="转发到: ${forward}"><i data-lucide="forward"></i></div>` : ''}
      <div class="line addr" title="${addr}">${addr}</div>
      <div class="line pwd">${m.password_is_default ? '<i data-lucide="unlock"></i> 默认密码' : '<i data-lucide="lock"></i> 已设密码'}</div>
      <div class="line login">${m.can_login ? '<i data-lucide="check"></i> 可登录' : '<i data-lucide="x-circle"></i> 禁止登录'}</div>
      <div class="line time">${time}</div>
      <div class="actions">
        <button class="btn-icon" data-action="copy" title="复制"><i data-lucide="copy"></i></button>
        <button class="btn-icon" data-action="password" title="${m.password_is_default ? '设置密码' : '重置密码'}"><i data-lucide="key"></i></button>
        <button class="btn-icon" data-action="forward" title="设置转发"><i data-lucide="forward"></i></button>
        <button class="btn-icon ${m.is_favorite ? 'active' : ''}" data-action="favorite" title="${m.is_favorite ? '取消收藏' : '收藏'}"><i data-lucide="star"></i></button>
      </div>
    </div>`;
}

/**
 * 渲染列表项（使用原始 CSS 类名）
 * @param {object} m - 邮箱数据
 * @returns {string}
 */
export function renderListItem(m) {
  const addr = escapeHtml(m.address);
  const time = formatTime(m.created_at);
  const forward = m.forward_to ? escapeHtml(m.forward_to) : '';
  
  return `
    <div class="mailbox-list-item" data-address="${addr}" data-id="${m.id}">
      <div class="pin-indicator">
        ${m.is_pinned ? '<span class="pin-icon"><i data-lucide="pin"></i></span>' : '<span class="pin-placeholder"></span>'}
      </div>
      <div class="mailbox-info">
        <div class="addr" title="${addr}">${addr}</div>
        <div class="meta">
          <span class="meta-time">${time}</span>
          <span class="meta-status meta-pwd" title="${m.password_is_default ? '默认密码' : '已设密码'}">${m.password_is_default ? '<i data-lucide="unlock"></i>' : '<i data-lucide="lock"></i>'}</span>
          <span class="meta-status meta-login ${m.can_login ? 'enabled' : 'disabled'}" title="${m.can_login ? '允许登录' : '禁止登录'}">${m.can_login ? '<i data-lucide="check"></i>' : '<i data-lucide="x-circle"></i>'}</span>
          <span class="meta-status meta-fav ${m.is_favorite ? 'active' : ''}" title="${m.is_favorite ? '已收藏' : '未收藏'}"><i data-lucide="star"></i></span>
          ${forward 
            ? `<span class="meta-forward" title="转发到: ${forward}"><i data-lucide="forward"></i> ${forward.length > 20 ? forward.substring(0, 20) + '...' : forward}</span>` 
            : '<span class="meta-status meta-forward-empty" title="未设置转发">—</span>'}
        </div>
      </div>
      <div class="list-actions">
        <button class="btn" data-action="copy" title="复制"><i data-lucide="copy"></i></button>
        <button class="btn" data-action="jump" title="查看邮件"><i data-lucide="mail"></i></button>
        <button class="btn" data-action="forward" title="转发设置"><i data-lucide="forward"></i></button>
        <button class="btn ${m.is_favorite ? 'active' : ''}" data-action="favorite" title="${m.is_favorite ? '取消收藏' : '收藏'}"><i data-lucide="star"></i></button>
        <button class="btn" data-action="login" title="${m.can_login ? '禁止登录' : '允许登录'}">${m.can_login ? '<i data-lucide="lock"></i>' : '<i data-lucide="unlock"></i>'}</button>
        <button class="btn" data-action="password" title="${m.password_is_default ? '设置密码' : '重置密码'}"><i data-lucide="key"></i></button>
        <button class="btn" data-action="delete" title="删除"><i data-lucide="trash-2"></i></button>
      </div>
    </div>`;
}

/**
 * 渲染网格视图
 * @param {Array} list - 邮箱列表
 * @returns {string}
 */
export function renderGrid(list) {
  if (!list || !list.length) return '';
  return list.map(m => renderCard(m)).join('');
}

/**
 * 渲染列表视图
 * @param {Array} list - 邮箱列表
 * @returns {string}
 */
export function renderList(list) {
  if (!list || !list.length) return '';
  return list.map(m => renderListItem(m)).join('');
}

export default {
  formatTime, escapeHtml, createSkeletonCard, createSkeletonListItem,
  generateSkeleton, renderCard, renderListItem, renderGrid, renderList
};
