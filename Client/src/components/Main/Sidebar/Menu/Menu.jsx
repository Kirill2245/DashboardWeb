import ButtonMenu from '../../../common/ButtonMenu/ButtonMenu';
import styles from './styles.module.css';
import dashboard from '@image/Category.svg';
import analytics from '@image/Chart.svg';
import invoice from '@image/Ticket.svg';
import schedule from '@image/Document.svg';
import calendar from '@image/Calendar.svg';
import messages from '@image/Activity.svg';
import notification from '@image/Notification.svg';
import setting from '@image/Setting.svg';
import dashboardActive from '@image/CategoryA.svg';
import { useState } from 'react';
const Menu = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const buttons = [
        { text: "Dashboard", image: dashboard , imageActive: dashboardActive },
        { text: "Analytics", image: analytics , imageActive: analytics},
        { text: "Invoice", image: invoice , imageActive: invoice},
        { text: "Schedule", image: schedule , imageActive: schedule},
        { text: "Calendar", image: calendar , imageActive: calendar},
        { text: "Messages", image: messages , imageActive: messages},
        { text: "Notification", image: notification , imageActive: notification},
        { text: "Settings", image: setting , imageActive: setting}
    ];

    return (
        <div className={styles.contain}>
            {buttons.map((button, index) => (
                <ButtonMenu
                    key={button.text}
                    text={button.text}
                    image={activeIndex === index ? button.imageActive : button.image}
                    active={activeIndex === index}
                    flag={false}
                    onClick={() => setActiveIndex(index)}
                />
            ))}
        </div>
    );
};

export default Menu