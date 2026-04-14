<?php
header('Content-Type: application/json');

$baseDir = __DIR__;
$result = ['chord' => [], 'scale' => []];

function scanDirCustom($dir) {
    if (!is_dir($dir)) return [];
    $items = array_diff(scandir($dir), ['.', '..']);
    return array_values(array_filter($items, function($item) use ($dir) {
        return is_dir($dir . '/' . $item);
    }));
}

$chordDir = $baseDir . '/acordes';
if (is_dir($chordDir)) {
    $notes = scanDirCustom($chordDir);
    foreach ($notes as $note) {
        $types = scanDirCustom($chordDir . '/' . $note);
        $result['chord'][$note] = $types;
    }
}

$scaleDir = $baseDir . '/escalas';
if (is_dir($scaleDir)) {
    $notes = scanDirCustom($scaleDir);
    foreach ($notes as $note) {
        $types = scanDirCustom($scaleDir . '/' . $note);
        $result['scale'][$note] = $types;
    }
}

echo json_encode($result);
