import React, { Component } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';

import NotificationType from '../../static/NotificationType';

class Notification extends Component {

    showNotification = (type, message) => {

        switch (type) {

            case NotificationType.INFO:
                NotificationManager.info(message, 'Info', 3000);
                break;

            case NotificationType.SUCCESS:
                NotificationManager.success(message, 'Success', 3000);
                break;

            case NotificationType.WARN:
                NotificationManager.warning(message, 'Warn', 3000);
                break;

            case NotificationType.ERROR:
                NotificationManager.error(message, 'Error', 3000);
                break;
            default:
                break;
        };
    }
    render() {

        return (
            <div>
                <NotificationContainer />
            </div>
        );
    }
}

export default Notification;

