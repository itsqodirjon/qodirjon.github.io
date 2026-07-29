/* Placeholder matnlarini tiniqlashtirish */
.form-input::placeholder {
    color: rgba(148, 163, 184, 0.6) !important;
}

/* Status bildirishnoma qutisi */
.form-status-box {
    display: none;
    margin-top: 18px;
}

.status-success {
    background: rgba(16, 185, 129, 0.12);
    border: 1px solid rgba(16, 185, 129, 0.3);
    color: #10b981;
    padding: 12px 16px;
    border-radius: 8px;
    font-family: var(--font-mono);
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    gap: 10px;
    animation: smoothFadeUp 0.4s ease;
}

.status-error {
    background: rgba(244, 63, 94, 0.12);
    border: 1px solid rgba(244, 63, 94, 0.3);
    color: #f43f5e;
    padding: 12px 16px;
    border-radius: 8px;
    font-family: var(--font-mono);
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    gap: 10px;
    animation: smoothFadeUp 0.4s ease;
}

/* Formagacha ikonkalarga rang berish */
.form-group label i {
    color: var(--accent);
    margin-right: 4px;
}

/* Tugma bosilganda o'chishi */
.submit-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
}
