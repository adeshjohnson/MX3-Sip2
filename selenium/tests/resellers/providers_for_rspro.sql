INSERT INTO `tariffs`(`id`,`name`,`purpose`,`owner_id`,`currency`) VALUE
                     ( 10 ,'Provider_tariff_for_rspro','provider',3,'USD');
update users set own_providers = 1 where id=3;
INSERT INTO `providers`(`id`,`name`                    ,`tech` ,`channel`,`login`,`password`,`server_ip`  ,`port`,`priority`,`quality`,`tariff_id`,`cut_a`,`cut_b`,`add_a`,`add_b`,`device_id`,`ani`,`timeout`,`call_limit`,`interpret_noanswer_as_failed`,`interpret_busy_as_failed`,`register`,`reg_extension`,`terminator_id`,`reg_line`,`hidden`,`use_p_asserted_identity`,`user_id`,`common_use`) VALUES
                       ( 2  ,'Test Provider Reseller'  ,'IAX2' ,''       ,'test2','test2'   ,'22.33.44.55','4569',        1 ,       1 ,        10 ,     0 ,     0 , ''    , ''    ,         8 ,    0,      60 ,          0 ,                            0 ,                        0 ,        0 , NULL          ,             0 , NULL     ,      0 ,                       0 ,       3 ,          0),
                       ( 3  ,'Test Provider Reseller 2','IAX2' ,''       ,'test3','test3'   ,'22.33.44.55','4569',        1 ,       1 ,        10 ,     0 ,     0 , ''    , ''    ,         9 ,    0,      60 ,          0 ,                            0 ,                        0 ,        0 , NULL          ,             0 , NULL     ,      0 ,                       0 ,       3 ,          0), 
                       ( 4  ,'Test Provider Admin'     ,'IAX2' ,''       ,'test4','test4'   ,'22.33.44.55','4569',        1 ,       1 ,         1 ,     0 ,    0  , NULL  , NULL  ,         10,    0,      60 ,          0 ,                            0 ,                        0 ,        0 , NULL          ,             0 , NULL     ,      0 ,                       0 ,       0 ,          0); 
INSERT INTO `devices` (`id`, `name`, `host`, `secret`, `context`, `ipaddr`, `port`, `regseconds`, `accountcode`, `callerid`, `extension`, `voicemail_active`, `username`, `device_type`, `user_id`, `primary_did_id`, `works_not_logged`, `forward_to`, `record`, `transfer`, `disallow`, `allow`, `deny`, `permit`, `nat`, `qualify`, `fullcontact`, `canreinvite`, `devicegroup_id`, `dtmfmode`, `callgroup`, `pickupgroup`, `fromuser`, `fromdomain`, `trustrpid`, `sendrpid`, `insecure`, `progressinband`, `videosupport`, `location_id`, `description`, `istrunk`, `cid_from_dids`, `pin`, `tell_balance`, `tell_time`, `tell_rtime_when_left`, `repeat_rtime_every`, `t38pt_udptl`, `regserver`, `ani`, `promiscredir`, `timeout`, `process_sipchaninfo`, `temporary_id`, `allow_duplicate_calls`, `call_limit`, `faststart`, `h245tunneling`, `latency`, `grace_time`, `recording_to_email`, `recording_keep`, `recording_email`) VALUES 
(8,'106','dynamic','106','mor_local','0.0.0.1',0,1175892667,2,'\"106\" <106>','106',0,'106','IAX2',6,0,1,0,0,'no','all','all','0.0.0.0/0.0.0.0','0.0.0.0/0.0.0.0','yes','yes','','no',NULL,'rfc2833',NULL,NULL,NULL,NULL,'no','no','no','never','no',1,'Test Device for Resellers User',0,0,NULL,0,0,60,60,'no',NULL,0,'no',60,0,NULL,0,0,'yes','yes',0,0,0,0,NULL);
INSERT INTO `users` (`id`, `username`, `password`, `usertype`, `logged`, `first_name`, `last_name`, `calltime_normative`, `show_in_realtime_stats`, `balance`, `frozen_balance`, `lcr_id`, `postpaid`, `blocked`, `tariff_id`, `month_plan_perc`, `month_plan_updated`, `sales_this_month`, `sales_this_month_planned`, `show_billing_info`, `primary_device_id`, `credit`, `clientid`, `agreement_number`, `agreement_date`, `language`, `taxation_country`, `vat_number`, `vat_percent`, `address_id`, `accounting_number`, `owner_id`, `hidden`, `allow_loss_calls`, `vouchers_disabled_till`, `uniquehash`,`temporary_id`, `send_invoice_types`, `call_limit`,`sms_tariff_id`, `sms_lcr_id`, `sms_service_active`, `cyberplat_active`, `call_center_agent`, `generate_invoice`, `tax_1`, `tax_2`, `tax_3`, `tax_4`, `block_at`, `block_at_conditional`, `block_conditional_use`, `recording_enabled`, `recording_forced_enabled`, `recordings_email`, `recording_hdd_quota`, `warning_email_active`, `warning_email_balance`, `warning_email_sent`, `tax_id`, `invoice_zero_calls`, `acc_group_id`) VALUES 
(6,'user_reseller2','09ded230f7c143810e7dbd890d7cf0fa46cb2fe8','user2',0,'User2','Resellers2',3,0,0,0,1,1,0,3,0,NULL,0,0,1,0,-1,'','0000000003','2009-03-31','',1,'',19,4,'',3,0,0,'2000-01-01 00:00:00',NULL,NULL,0,0,NULL,NULL,0,0,0,1,0,0,0,0,'2009-01-01',15,0,0,0,NULL,100,0,0,0,3,1,0);