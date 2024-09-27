// 倒计时功能
function updateCountdown() {
    const now = new Date();
    const target = new Date(now.getFullYear(), 9, 1); // 10月1日
    if (now > target) {
        target.setFullYear(target.getFullYear() + 1);
    }
    
    const diff = target - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('countdown').innerHTML = `距离国庆节还有: ${days}天 ${hours}小时 ${minutes}分钟 ${seconds}秒`;
}

setInterval(updateCountdown, 1000);

// 烟花效果
function createFirework() {
    const firework = document.createElement('div');
    firework.className = 'firework';
    firework.style.left = Math.random() * 100 + 'vw';
    firework.style.animationDuration = (Math.random() * 3 + 2) + 's';
    document.querySelector('.fireworks').appendChild(firework);

    setTimeout(() => {
        firework.remove();
    }, 5000);
}

setInterval(createFirework, 300);

// 添加烟花样式
const style = document.createElement('style');
style.innerHTML = `
    .firework {
        position: absolute;
        bottom: 0;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: #ffff00;
        animation: shoot linear forwards;
    }

    @keyframes shoot {
        0% { transform: translateY(0) scale(1); }
        50% { transform: translateY(-50vh) scale(0.5); opacity: 1; }
        100% { transform: translateY(-100vh) scale(0.1); opacity: 0; }
    }
`;
document.head.appendChild(style);

// 背景音乐控制
const bgMusic = document.getElementById('bgMusic');
const toggleMusicBtn = document.getElementById('toggleMusic');
const tooltip = document.querySelector('.tooltip');

function updateMusicButton() {
    if (bgMusic.paused) {
        toggleMusicBtn.classList.remove('pause-icon');
        toggleMusicBtn.classList.add('play-icon');
        tooltip.textContent = '播放音乐';
    } else {
        toggleMusicBtn.classList.remove('play-icon');
        toggleMusicBtn.classList.add('pause-icon');
        tooltip.textContent = '暂停音乐';
    }
}

function playMusic() {
    bgMusic.muted = false;  // 取消静音
    bgMusic.play().then(() => {
        updateMusicButton();
    }).catch(error => {
        console.log("自动播放失败:", error);
    });
}

function attemptAutoplay() {
    playMusic();
    document.removeEventListener('click', attemptAutoplay);
    document.removeEventListener('keydown', attemptAutoplay);
    document.removeEventListener('scroll', attemptAutoplay);
}

toggleMusicBtn.addEventListener('click', () => {
    if (bgMusic.paused) {
        playMusic();
    } else {
        bgMusic.pause();
        updateMusicButton();
    }
});

// 尝试自动播放
document.addEventListener('DOMContentLoaded', () => {
    attemptAutoplay();
    
    // 如果自动播放失败，监听用户交互事件
    document.addEventListener('click', attemptAutoplay);
    document.addEventListener('keydown', attemptAutoplay);
    document.addEventListener('scroll', attemptAutoplay);
});

// 初始化按钮状态
updateMusicButton();

// 随机祝福语
const wishes = [
    "祝福祖国繁荣昌盛",
    "愿祖国更加富强",
    "祝福中华民族伟大复兴",
    "祝福祖国繁荣富强",
    "愿祖国国泰民安",
    "祝福祖国蒸蒸日上",
    "愿祖国繁荣昌盛，国泰民安",
    "祝福祖国更加繁荣富强",
    "愿祖国的明天更加美好",
    "祝福祖国永远繁荣昌盛"
];

function createWish() {
    const wish = document.createElement('div');
    wish.className = 'wish';
    wish.textContent = wishes[Math.floor(Math.random() * wishes.length)];
    wish.style.left = Math.random() * 100 + 'vw';
    wish.style.animationDuration = (Math.random() * 10 + 5) + 's';
    document.getElementById('wishes').appendChild(wish);

    setTimeout(() => {
        wish.remove();
    }, 15000);
}

setInterval(createWish, 2000);