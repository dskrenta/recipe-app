import React from 'react';
import { FaClipboardList, FaShoppingCart, FaBookmark } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import styles from './TabBar.module.css';

const tabs = [
  {
    name: 'Recipes',
    iconName: 'clipboard-list',
    icon: <FaClipboardList size={30} />
  },
  {
    name: 'ShoppingList',
    iconName: 'shopping-cart',
    icon: <FaShoppingCart size={30} />
  },
  {
    name: 'Saved',
    iconName: 'bookmark',
    icon: <FaBookmark size={30} />
  }
];

const TabBar = ({ navigation }) => {
  //const activeRoute = navigation.state.routes[navigation.state.index].routeName;
  const activeRoute = 'Recipes'
  return (
    <div className={styles.outer}>
      <div className={styles.contain}>
        {tabs.map((tab, i) => (
          <Link
            to={`/${tab.name.charAt(0).toLowerCase() + tab.name.slice(1)}`}
            key={i}
            style={{width: '33%', textDecoration: 'none'}}
          >
            <div
              className={styles.tab}
              style={activeRoute === tab.name ? {color: '#2c6'} : {color: '#aaa'}}
            >
              {tab.icon}
              <span>{tab.name}</span>
              {/*i % 2
                ? <Icon
                    name={tab.icon}
                    color={activeRoute === tab.name ? '#2c6' : '#aaa'}
                    size={33}
                    style={{marginBottom: 3}}
                  />
                : <Icon5
                    name={tab.icon}
                    color={activeRoute === tab.name ? '#2c6' : '#aaa'}
                    size={30}
                    style={{marginBottom: 3}}
                  />
              */}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TabBar
