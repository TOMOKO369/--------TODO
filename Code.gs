function doPost(e) {
  // アクセスされたスプレッドシートの現在アクティブなシートを取得
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // POSTリクエストで送られてきたJSONデータをパース
  var data = JSON.parse(e.postData.contents);
  var tasks = data.tasks;
  
  // 記録する現在時刻
  var timestamp = new Date();
  
  // 送られてきた3つのタスクをループ処理
  tasks.forEach(function(task) {
    // タスクが空欄でない場合のみシートに記録する
    if (task.text && task.text.trim() !== "") {
      sheet.appendRow([
        timestamp,                  // A列: タイムスタンプ
        "タスク " + task.id,          // B列: タスク番号 (1, 2, 3)
        task.text,                  // C列: タスクの内容
        task.completed ? "完了" : "未完了" // D列: 完了ステータス
      ]);
    }
  });

  // 成功レスポンスを返す（JSON形式）
  return ContentService.createTextOutput(JSON.stringify({ "status": "success" }))
    .setMimeType(ContentService.MimeType.JSON);
}
