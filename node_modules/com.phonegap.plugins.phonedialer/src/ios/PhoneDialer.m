//
//  PhoneDialer.m
//
//  Created by Justin McNally on 11/17/11.
//  Copyright (c) 2011 Kohactive. All rights reserved.
//
//  Revised by Trevor Cox of Appazur Solutions Inc. on 01/06/12

#import "PhoneDialer.h"
#import <Cordova/CDV.h>

@implementation PhoneDialer

// 'number' param may be either an unescaped phone number or a tel: url
- (void) dial:(CDVInvokedUrlCommand*)command {
    CDVPluginResult* pluginResult = nil;
    NSString* url;
    NSString* number = [command.arguments objectAtIndex:0];

    if (number != nil && [number length] > 0) {
        if([number hasPrefix:@"tel:"]) {
            url = number;
        }
        else {
            // escape characters such as spaces that may not be accepted by openURL
            url = [NSString stringWithFormat:@"tel:%@",
                [number stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding]];
        }

        // openURL is expected to fail on devices that do not have the Phone app, such as simulators, iPad, iPod touch
        if(![[UIApplication sharedApplication] openURL:[NSURL URLWithString:url]]) {
            NSLog(@"openURL failed, %@, %@", [[UIDevice currentDevice] model], url);
            UIAlertView *Notpermitted=[[UIAlertView alloc] initWithTitle:@"Phone" message:@"Your device doesn't support this feature." delegate:nil cancelButtonTitle:@"OK" otherButtonTitles:nil];
            [Notpermitted show];

            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"notsupported"];
        } else {
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
        }
    } else {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"null"];
    }

    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

@end
