// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
// use tauri::{Emitter, EventTarget};
// use log::info;
// use tokio::sync::mpsc;

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let _app = tauri::Builder::default()
        .plugin(tauri_plugin_window_state::Builder::new().build())
        .plugin(tauri_plugin_store::Builder::new().build())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_http::init())
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_clipboard_manager::init())
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

// // A function that sends a message from Rust to JavaScript via a Tauri Event
// fn rs2js<R: tauri::Runtime>(app: tauri::AppHandle) {
//     // info!(?message, "rs2js");
//     // app.emit_to("rs2js", "message",1)
//     for i in 1..100 {
//         std::thread::sleep(std::time::Duration::from_millis(150));
//         app.emit_to(EventTarget::app(), "download-progress", i);
//     }
// }

// // The Tauri command that gets called when Tauri `invoke` JavaScript API is
// // called
// #[tauri::command]
// fn js2rs(name: &str) -> String {
//     rs2js(app);
//     format!("js2rs, {}! ", name)
// }
