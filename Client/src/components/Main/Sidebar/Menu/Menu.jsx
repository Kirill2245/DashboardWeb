import ButtonMenu from '@common/ButtonMenu/ButtonMenu';
import styles from './styles.module.css';
import dashboard from '@image/Category.svg';
import dashboardActive from '@image/CategoryA.svg';
import analytics from '@image/Chart.svg';
import analyticsActive from '@image/ChartA.svg';
import invoice from '@image/Ticket.svg';
import invoiceActive from '@image/TicketA.svg';
import schedule from '@image/Document.svg';
import scheduleActive from '@image/DocumentA.svg';
import calendar from '@image/Calendar.svg';
import calendarActive from '@image/CalendarA.svg';
import messages from '@image/Activity.svg';
import messagesActive from '@image/ActivityA.svg';
import notification from '@image/Notification.svg';
import notificationActive from '@image/Notification.svg';
import setting from '@image/Setting.svg';
import settingActive from '@image/SettingA.svg';

import { useState } from 'react';
import ImageMenu from '../../../common/ImageMenu/ImageMenu';
const Menu = ({isCollapsed = false, onButtonClick}) => {
    const [activeIndex, setActiveIndex] = useState(null);
    const handleButtonClick = (index) => {
        return () => {
            setActiveIndex(index)
            onButtonClick(index)
        }
    };
    const buttons = [
        { text: "Dashboard", image: dashboard , imageActive: dashboardActive, flag: false },
        { text: "Analytics", image: analytics , imageActive: analyticsActive, flag: false },
        { text: "Invoice", image: invoice , imageActive: invoiceActive, flag: false },
        { text: "Schedule", image: schedule , imageActive: scheduleActive, flag: false },
        { text: "Calendar", image: calendar , imageActive: calendarActive, flag: false },
        { text: "Messages", image: messages , imageActive: messagesActive, flag: true },
        { text: "Notification", image: notification , imageActive: notificationActive, flag: false },
        { text: "Settings", image: setting , imageActive: settingActive, flag: false }
    ];

    return (
        <>
            {!isCollapsed ? 
                (
                <div className={styles.contain}>
                    {buttons.map((button, index) => (
                        <ButtonMenu
                            key={button.text}
                            text={button.text}
                            image={activeIndex === index ? button.imageActive : button.image}
                            active={activeIndex === index}
                            flag={button.flag}
                            onClick={handleButtonClick(index)}
                        />
                    ))}
                </div>
                ):
                (
                <div className={styles.CollapsedContain}>
                    {buttons.map((button, index) => (
                        <ImageMenu key={button.text} image={activeIndex === index ? button.imageActive : button.image} active={activeIndex === index} onClick={handleButtonClick(index)}/>
                    ))}
                </div>
                )
            }
        </>
    );
};

export default Menu