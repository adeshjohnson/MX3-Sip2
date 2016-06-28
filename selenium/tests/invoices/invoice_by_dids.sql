INSERT INTO `calls`
(`id`, `calldate`          , `clid`      , `src`       , `dst`       , `dcontext`, `channel`, `dstchannel`, `lastapp`, `lastdata`, `duration`, `billsec`, `disposition`, `amaflags`, `accountcode`, `uniqueid`   , `userfield`, `src_device_id`, `dst_device_id`, `processed`, `did_price`, `card_id`, `provider_id`, `provider_rate`, `provider_billsec` , `provider_price`, `user_id`, `user_rate`, `user_billsec`, `user_price`, `reseller_id`, `reseller_rate`, `reseller_billsec`, `reseller_price`, `partner_id`, `partner_rate`, `partner_billsec`, `partner_price`, `prefix`, `server_id`, `hangupcause`, `callertype`, `peerip`, `recvip`, `sipfrom`, `uri`, `useragent`, `peername`, `t38passthrough`, `did_inc_price`, `did_prov_price`, `localized_dst`, `did_provider_id`, `did_id`, `originator_ip`, `terminator_ip`, `real_duration`, `real_billsec`, `did_billsec`)
VALUES
(65  ,'2011-07-01 00:00:01','37069911221','37069911221','37069911222',''         ,''        ,''           ,''        ,''         ,10         ,20        ,'ANSWERED'    ,0          ,'2'           ,'1232113370.3',''          ,5               ,3               ,0           ,2           ,0         ,1             ,1               ,10                  ,2                ,0         ,3           ,11              ,4            ,0             ,0               ,20                  ,0                ,0            ,0              ,0                 ,0               ,'370'  ,1           ,16            ,'Local'      ,''       ,''       ,''        ,''    ,''          ,''         ,0                ,0               ,0                ,'37069911222'   ,0                 ,11        ,''              ,''              ,0               ,60              ,70),
(66  ,'2011-07-01 00:50:02','37069911222','37069911222','37069911223',''         ,''        ,''           ,''        ,''         ,20         ,30        ,'ANSWERED'    ,0          ,'2'           ,'1232113371.3',''          ,3               ,6               ,0           ,4           ,0         ,1             ,2               ,20                  ,3                ,2         ,4           ,21              ,5            ,0             ,0               ,30                  ,0                ,0            ,0              ,0                 ,0               ,'370'  ,1           ,16            ,'Local'      ,''       ,''       ,''        ,''    ,''          ,''         ,0                ,0               ,0                ,'37069911223'   ,0                 ,21        ,''              ,''              ,0               ,70              ,60),
(67  ,'2011-08-01 00:00:03','37069911223','37069911223','37069911224',''         ,''        ,''           ,''        ,''         ,30         ,40        ,'ANSWERED'    ,0          ,'2'           ,'1232113372.3',''          ,6               ,0               ,0           ,5           ,0         ,1             ,3               ,30                  ,4                ,3         ,5           ,31              ,6            ,0             ,7               ,40                  ,8                ,0            ,0              ,0                 ,0               ,'370'  ,1           ,16            ,'Local'      ,''       ,''       ,''        ,''    ,''          ,''         ,0                ,0               ,0                ,'37069911224'   ,0                 ,31        ,''              ,''              ,0               ,80              ,80),
(68  ,'2011-09-01 00:00:04','37069911224','37069911224','37069911225',''         ,''        ,''           ,''        ,''         ,40         ,50        ,'ANSWERED'    ,0          ,'2'           ,'1232113373.3',''          ,1               ,7               ,0           ,-4          ,0         ,1             ,4               ,40                  ,5                ,-1        ,6           ,41              ,7            ,0             ,0               ,50                  ,0                ,0            ,0              ,0                 ,0               ,'370'  ,1           ,16            ,'Outside'    ,''       ,''       ,''        ,''    ,''          ,''         ,0                ,0               ,0                ,'37069911225'   ,0                 ,41        ,''              ,''              ,0               ,90              ,50),
(69  ,'2011-10-01 00:00:01','37069911225','37069911225','37069911226',''         ,''        ,''           ,''        ,''         ,50         ,60        ,'ANSWERED'    ,0          ,'2'           ,'1232113370.3',''          ,7               ,2               ,0           ,9           ,0         ,1             ,5               ,50                  ,6                ,5         ,7           ,51              ,8            ,3             ,9               ,60                  ,10               ,0            ,0              ,0                 ,0               ,'370'  ,1           ,16            ,'Outside'    ,''       ,''       ,''        ,''    ,''          ,''         ,0                ,0               ,0                ,'37069911226'   ,0                 ,51        ,''              ,''              ,0               ,10              ,40),
(70  ,'2011-11-01 00:00:02','37069911226','37069911226','37069911227',''         ,''        ,''           ,''        ,''         ,60         ,70        ,'ANSWERED'    ,0          ,'2'           ,'1232113371.3',''          ,2               ,6               ,0           ,-6          ,0         ,1             ,6               ,60                  ,7                ,2         ,8           ,61              ,9            ,0             ,0               ,70                  ,0                ,0            ,0              ,0                 ,0               ,'370'  ,1           ,16            ,'Local'      ,''       ,''       ,''        ,''    ,''          ,''         ,0                ,0               ,0                ,'37069911227'   ,0                 ,61        ,''              ,''              ,0               ,20              ,30),
(71  ,'2011-12-01 00:00:03','37069911227','37069911227','37069911228',''         ,''        ,''           ,''        ,''         ,70         ,80        ,'ANSWERED'    ,0          ,'2'           ,'1232113372.3',''          ,6               ,7               ,0           ,-3          ,0         ,1             ,7               ,70                  ,8                ,3         ,9           ,71              ,10           ,0             ,11              ,80                  ,12               ,0            ,0              ,0                 ,0               ,'370'  ,1           ,16            ,'Outside'    ,''       ,''       ,''        ,''    ,''          ,''         ,0                ,0               ,0                ,'37069911228'   ,0                 ,71        ,''              ,''              ,0               ,30              ,20),
(72  ,'2011-01-01 00:00:04','37069911228','37069911228','37069911221',''         ,''        ,''           ,''        ,''         ,80         ,90        ,'ANSWERED'    ,0          ,'2'           ,'1232113373.3',''          ,7               ,5               ,0           ,9           ,0         ,1             ,8               ,80                  ,9                ,5         ,10          ,81              ,11           ,3             ,12              ,90                  ,13               ,0            ,0              ,0                 ,0               ,'370'  ,1           ,16            ,'Outside'    ,''       ,''       ,''        ,''    ,''          ,''         ,0                ,0               ,0                ,'37069911221'   ,0                 ,81        ,''              ,''              ,0               ,40              ,10);