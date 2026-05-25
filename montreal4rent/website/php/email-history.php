<?php
// email-history.php - Persist and list email logs

// Add CORS headers for Angular app
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  exit;
}

$baseDir = __DIR__ . '/../history/emails';
if (!is_dir($baseDir)) {
  @mkdir($baseDir, 0775, true);
}

function respond($payload, $status = 200) {
  http_response_code($status);
  echo json_encode($payload, JSON_UNESCAPED_UNICODE);
  exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $raw = file_get_contents('php://input');
  $data = json_decode($raw, true);
  if (!is_array($data)) {
    $data = $_POST;
  }
  $fname = $baseDir . '/' . gmdate('Ymd_His') . '_' . substr(bin2hex(random_bytes(4)), 0, 8) . '.json';
  $ok = @file_put_contents($fname, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
  if ($ok === false) {
    respond(['success' => false, 'message' => 'Failed to persist history'], 500);
  }
  respond(['success' => true, 'file' => basename($fname)]);
}

// Download a specific file
if (isset($_GET['file'])) {
  $file = basename($_GET['file']);
  $path = $baseDir . '/' . $file;
  if (!is_file($path)) {
    respond(['error' => 'File not found'], 404);
  }
  header('Content-Type: application/json; charset=utf-8');
  header('Content-Disposition: attachment; filename="'.$file.'"');
  readfile($path);
  exit;
}

// List files
$limit = 200;
if (isset($_GET['limit'])) {
  $limit = max(1, min(1000, intval($_GET['limit'])));
}
$files = glob($baseDir . '/*.json');
usort($files, function($a, $b) { return filemtime($b) <=> filemtime($a); });
$files = array_slice($files, 0, $limit);
$out = [];
foreach ($files as $f) {
  $out[] = [
    'file' => basename($f),
    'size' => filesize($f),
    'mtime' => gmdate('c', filemtime($f))
  ];
}
respond($out);
