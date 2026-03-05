function renderRoomMapTemplate(rootId, mapData, onRoomClick) {
  var wrap = document.getElementById(rootId);
  if (!wrap) {
    return;
  }

  if (!document.getElementById('room-map-style')) {
    var style = document.createElement('style');
    style.id = 'room-map-style';
    style.innerHTML = [
      '.room-map-wrap { margin-top:12px; padding:10px; background:#1b1b1b; border:1px solid #333; }',
      '.room-map-title { font-size:12px; color:#bbb; margin-bottom:8px; }',
      '.room-map-grid { display:grid; gap:8px; justify-content:start; }',
      '.room-map-room { min-width:72px; background:#0b1220; border:1px solid #334155; border-radius:8px; color:#e2e8f0; padding:6px; display:flex; flex-direction:column; align-items:center; gap:4px; cursor:pointer; }',
      '.room-map-room.current { border-color:#22c55e; }',
      '.room-map-room img { width:28px; height:28px; display:block; border-radius:4px; }',
      '.room-map-room span { font-size:11px; text-align:center; line-height:1.2; }'
    ].join('');
    document.head.appendChild(style);
  }

  wrap.innerHTML = '';
  wrap.className = 'room-map-wrap';

  var title = document.createElement('div');
  title.className = 'room-map-title';
  title.textContent = 'Explored Map (Current Floor)';
  wrap.appendChild(title);

  var grid = document.createElement('div');
  grid.className = 'room-map-grid';

  var cols = Math.max(1, mapData.cols || 1);
  var rows = Math.max(1, mapData.rows || 1);
  grid.style.gridTemplateColumns = 'repeat(' + cols + ', minmax(56px, 1fr))';
  grid.style.gridTemplateRows = 'repeat(' + rows + ', minmax(56px, auto))';

  (mapData.rooms || []).forEach(function (room) {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'room-map-room' + (room.current ? ' current' : '');
    btn.title = room.id;
    btn.style.gridColumn = String(room.col);
    btn.style.gridRow = String(room.row);

    var img = document.createElement('img');
    img.src = room.icon;
    img.alt = room.label;

    var label = document.createElement('span');
    label.textContent = room.label;

    btn.appendChild(img);
    btn.appendChild(label);
    btn.addEventListener('click', function () {
      onRoomClick(room.id);
    });

    grid.appendChild(btn);
  });

  wrap.appendChild(grid);
}
