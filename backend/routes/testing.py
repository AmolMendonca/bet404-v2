def _resolve_cell(reco_cell, soft17_hit, surrender_allowed, double_allowed):
    """
    Resolve a chart cell to a concrete single-letter action for V1.

    Inputs:
      reco_cell (str): e.g. 'H','S','D','P','R','DS','DH','DP','RH','RS','RH/H','15/16', etc.
      soft17_hit (bool): True = H17 rules, False = S17
      surrender_allowed (bool): can surrender in this game
      double_allowed (bool): can double on this first decision (per settings + first two cards)

    Returns: one of 'H','S','D','P','R'
    """
    cell = (reco_cell or '').strip().upper()

    # Handle H17/S17 split like 'RH/H' or '15/16' (we only care about the left/right token)
    if '/' in cell:
        left, right = cell.split('/', 1)
        cell = left if soft17_hit else right
        cell = cell.strip().upper()

    # Macros that depend on doubling/surrender availability
    if cell == 'DS':               # Double if allowed else Stand
        return 'D' if double_allowed else 'S'
    if cell == 'DH':               # Double if allowed else Hit
        return 'D' if double_allowed else 'H'
    if cell == 'DP':               # Double if allowed else Split (rare, but support it)
        return 'D' if double_allowed else 'P'
    if cell == 'RH':               # Surrender if allowed else Hit
        return 'R' if surrender_allowed else 'H'
    if cell == 'RS':               # Surrender if allowed else Stand
        return 'R' if surrender_allowed else 'S'
    if cell == 'RP':
        return 'R' if surrender_allowed else 'P'

    # Plain directives
    if cell in ('H', 'S', 'P', 'R', 'D'):
        if cell == 'R' and not surrender_allowed:
            return 'H'
        if cell == 'D' and not double_allowed:
            # Conservative fallback when a plain 'D' is present but doubling disallowed
            return 'H'
        return cell

    # Unknown/complex text => safe default
    return 'H'

reco_cell = 'RH/H'       
soft17_hit = True       
surrender_allowed = False
double_allowed = False

result = _resolve_cell(reco_cell, soft17_hit, surrender_allowed, double_allowed)
print(f"resolve({reco_cell=}, {soft17_hit=}, {surrender_allowed=}, {double_allowed=}) => {result}")

