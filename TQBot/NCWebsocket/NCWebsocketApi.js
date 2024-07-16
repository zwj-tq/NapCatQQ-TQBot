import { NCWebsocketBase } from "./NCWebsocketBase.js";
export class NCWebsocketApi extends NCWebsocketBase {
  reboot_normal(params) {
    return this.send("reboot_normal", params);
  }
  get_robot_uin_range() {
    return this.send("get_robot_uin_range", {});
  }
  set_online_status(params) {
    return this.send("set_online_status", params);
  }
  get_friends_with_category() {
    return this.send("get_friends_with_category", {});
  }
  set_qq_avatar(params) {
    return this.send("set_qq_avatar", params);
  }
  debug(params) {
    return this.send("debug", params);
  }
  get_file(params) {
    return this.send("get_file", params);
  }
  forward_friend_single_msg(params) {
    return this.send("forward_friend_single_msg", params);
  }
  forward_group_single_msg(params) {
    return this.send("forward_group_single_msg", params);
  }
  translate_en2zh(params) {
    return this.send("translate_en2zh", params);
  }
  get_group_file_count(params) {
    return this.send("get_group_file_count", params);
  }
  get_group_file_list(params) {
    return this.send("get_group_file_list", params);
  }
  set_group_file_folder(params) {
    return this.send("set_group_file_folder", params);
  }
  del_group_file(params) {
    return this.send("del_group_file", params);
  }
  del_group_file_folder(params) {
    return this.send("del_group_file_folder", params);
  }
  reboot(params) {
    return this.send("reboot", params);
  }
  send_like(params) {
    return this.send("send_like", params);
  }
  get_login_info() {
    return this.send("get_login_info", {});
  }
  get_friend_list() {
    return this.send("get_friend_list", {});
  }
  get_group_info(params) {
    return this.send("get_group_info", params);
  }
  get_group_list() {
    return this.send("get_group_list", {});
  }
  get_group_member_info(params) {
    return this.send("get_group_member_info", params);
  }
  get_group_member_list(params) {
    return this.send("get_group_member_list", params);
  }
  get_msg(params) {
    return this.send("get_msg", params);
  }
  send_msg(params) {
    return this.send("send_msg", params);
  }
  send_group_msg(params) {
    return this.send("send_group_msg", params);
  }
  send_private_msg(params) {
    return this.send("send_private_msg", params);
  }
  delete_msg(params) {
    return this.send("delete_msg", params);
  }
  set_msg_emoji_like(params) {
    return this.send("set_msg_emoji_like", params);
  }
  set_group_add_request(params) {
    return this.send("set_group_add_request", params);
  }
  set_friend_add_request(params) {
    return this.send("set_friend_add_request", params);
  }
  set_group_leave(params) {
    return this.send("set_group_leave", params);
  }
  get_version_info() {
    return this.send("get_version_info", {});
  }
  get_status() {
    return this.send("get_status", {});
  }
  can_send_record() {
    return this.send("can_send_record", {});
  }
  can_send_image() {
    return this.send("can_send_image", {});
  }
  set_group_kick(params) {
    return this.send("set_group_kick", params);
  }
  set_group_ban(params) {
    return this.send("set_group_ban", params);
  }
  set_group_whole_ban(params) {
    return this.send("set_group_whole_ban", params);
  }
  set_group_admin(params) {
    return this.send("set_group_admin", params);
  }
  set_group_card(params) {
    return this.send("set_group_card", params);
  }
  set_group_name(params) {
    return this.send("set_group_name", params);
  }
  get_image(params) {
    return this.send("get_image", params);
  }
  get_record(params) {
    return this.send("get_record", params);
  }
  clean_cache() {
    return this.send("clean_cache", {});
  }
  get_cookies(params) {
    return this.send("get_cookies", params);
  }
  ".handle_quick_operation" = (params) => {
    return this.send(".handle_quick_operation", params);
  };
  get_group_honor_info(params) {
    return this.send("get_group_honor_info", params);
  }
  get_essence_msg_list(params) {
    return this.send("get_essence_msg_list", params);
  }
  _send_group_notice(params) {
    return this.send("_send_group_notice", params);
  }
  _get_group_notice(params) {
    return this.send("_get_group_notice", params);
  }
  send_forward_msg(params) {
    return this.send("send_forward_msg", params);
  }
  send_group_forward_msg(params) {
    return this.send("send_group_forward_msg", params);
  }
  send_private_forward_msg(params) {
    return this.send("send_private_forward_msg", params);
  }
  get_stranger_info(params) {
    return this.send("get_stranger_info", params);
  }
  mark_msg_as_read(params) {
    return this.send("mark_msg_as_read", params);
  }
  get_guild_list() {
    return this.send("get_guild_list", {});
  }
  mark_private_msg_as_read(params) {
    return this.send("mark_private_msg_as_read", params);
  }
  mark_group_msg_as_read(params) {
    return this.send("mark_group_msg_as_read", params);
  }
  upload_group_file(params) {
    return this.send("upload_group_file", params);
  }
  download_file(params) {
    return this.send("download_file", params);
  }
  get_group_msg_history(params) {
    return this.send("get_group_msg_history", params);
  }
  get_forward_msg(params) {
    return this.send("get_forward_msg", params);
  }
  get_friend_msg_history(params) {
    return this.send("get_friend_msg_history", params);
  }
  get_group_system_msg(params) {
    return this.send("get_group_system_msg", params);
  }
  get_online_clients(params) {
    return this.send("get_online_clients", params);
  }
  ocr_image(params) {
    return this.send("ocr_image", params);
  }
  set_self_profile(params) {
    return this.send("set_self_profile", params);
  }

  reply(
    e /** 信息源 */,
    msg /** 回复信息 */,
    reply = false /** 引用回复 */,
    at = false /** at回复 */
  ) {
    log(JSON.stringify(e));
    if (reply) {
      msg = `[CQ:reply,id=${e.message_id}] ${msg}`;
    }
    if (at) {
      msg = `[CQ:at,qq=${e.user_id}] ${msg}`;
    }
    send_msg({
      message_type: e.message_type,
      user_id: e.user_id,
      group_id: e.group_id,
      message: msg,
      text: "text",
    });
  }
}
