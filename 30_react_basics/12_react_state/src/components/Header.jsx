// Resources

import chefClaudeIcon from '/src/assets/icons/chef-claude-icon.png';

// Current Component

export default function Header() {
    return (
        <>
            <header>
                <nav>
                    <img
                        className='header-icon'
                        src={chefClaudeIcon}
                        alt='Chef Claude icon'
                    />
                    <span className='header-title'>Chef Claude</span>
                </nav>
            </header>
        </>
    );
}
