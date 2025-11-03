# IP Allowlist Feature

## Overview
The Allowlist feature allows administrators to manage trusted IP addresses that bypass security rules in the BMDRM Security Center.

## Features

### ✅ View Allowlist
- Display all allowlisted IP addresses in a table format
- Shows IP address, reason, and creation date
- Real-time count of total entries
- Empty state with helpful message when no entries exist

### ✅ Add IP to Allowlist
- Modal dialog for adding new IP addresses
- Required IP address field with validation
- Optional reason field for documentation
- Form validation and error handling
- Automatic list refresh after successful addition

### ✅ Remove IP from Allowlist
- One-click removal with confirmation dialog
- Loading state during deletion
- Automatic list refresh after successful removal
- Error handling with user feedback

## API Endpoints

### GET `/api/allowlist`
**Purpose:** Fetch all allowlisted IP addresses

**Request:**
```bash
GET /api/allowlist
Authorization: Bearer <token>
```

**Response:**
```json
{
  "allowlist": [
    {
      "ip": "192.168.1.100",
      "reason": "Office network",
      "created_at": "2025-11-03T10:30:00Z",
      "updated_at": "2025-11-03T10:30:00Z"
    }
  ]
}
```

**Alternative Response Format:**
```json
[
  {
    "ip": "192.168.1.100",
    "reason": "Office network",
    "created_at": "2025-11-03T10:30:00Z"
  }
]
```

### POST `/api/allowlist`
**Purpose:** Add a new IP to the allowlist

**Request:**
```bash
POST /api/allowlist
Authorization: Bearer <token>
Content-Type: application/json

{
  "ip": "192.168.1.100",
  "reason": "Office network"
}
```

**Body Parameters:**
- `ip` (required): IP address to allowlist (e.g., "192.168.1.100")
- `reason` (optional): Reason for allowlisting this IP

**Response:**
```json
{
  "success": true,
  "ip": "192.168.1.100",
  "message": "IP added to allowlist"
}
```

**Error Response:**
```json
{
  "error": "IP address is required"
}
```

### DELETE `/api/allowlist/{ip}`
**Purpose:** Remove an IP from the allowlist

**Request:**
```bash
DELETE /api/allowlist/192.168.1.100
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "message": "IP removed from allowlist"
}
```

**Error Response:**
```json
{
  "error": "IP not found in allowlist"
}
```

## User Interface

### Navigation
The Allowlist page is accessible from the main navigation menu with a shield icon.

### Page Layout
```
┌─────────────────────────────────────────────┐
│ IP Allowlist                    [+ Add IP]  │
│ Manage trusted IP addresses...              │
├─────────────────────────────────────────────┤
│ Allowed IP Addresses            [3 entries] │
├──────────────┬──────────┬──────────┬────────┤
│ IP Address   │ Reason   │ Added    │ Actions│
├──────────────┼──────────┼──────────┼────────┤
│ 192.168.1.100│ Office   │ Nov 3... │ Remove │
│ 10.0.0.50    │ VPN      │ Nov 2... │ Remove │
│ 172.16.0.1   │ Gateway  │ Nov 1... │ Remove │
└──────────────┴──────────┴──────────┴────────┘
```

### Add IP Modal
```
┌──────────────────────────────────┐
│ Add IP to Allowlist         [X]  │
├──────────────────────────────────┤
│ IP Address *                     │
│ ┌──────────────────────────────┐ │
│ │ 192.168.1.100                │ │
│ └──────────────────────────────┘ │
│                                  │
│ Reason (optional)                │
│ ┌──────────────────────────────┐ │
│ │ Office network               │ │
│ │                              │ │
│ └──────────────────────────────┘ │
├──────────────────────────────────┤
│           [Cancel] [Add to...]   │
└──────────────────────────────────┘
```

## Data Schema

### AllowlistEntry Type
```typescript
type AllowlistEntry = {
  ip: string;              // IP address (required)
  reason?: string;         // Reason for allowlisting (optional)
  created_at?: string;     // ISO 8601 date string (optional)
  updated_at?: string;     // ISO 8601 date string (optional)
};
```

## UI/UX Features

### Loading States
- Spinner during initial data fetch
- "Loading allowlist..." message
- Button disable states during submission
- Inline loading indicators for deletion

### Error Handling
- Red error banner for fetch failures
- Form validation for required fields
- Confirmation dialogs for destructive actions
- User-friendly error messages

### Empty States
- Helpful illustration (shield icon)
- Clear message explaining no entries
- Call-to-action button to add first entry

### Responsive Design
- Mobile-friendly modal dialogs
- Responsive table layout with horizontal scroll
- Touch-friendly buttons and inputs

### Visual Indicators
- Green dot for active allowlist entries
- Color-coded action buttons (red for remove)
- Loading spinners for async operations
- Hover effects on interactive elements

## Security Considerations

1. **Authentication Required**: All API endpoints require valid auth token
2. **Authorization**: Only authenticated users can view/modify allowlist
3. **Input Validation**: IP addresses are validated on both client and server
4. **Confirmation Dialogs**: Destructive actions require user confirmation
5. **Audit Trail**: Created/updated timestamps for compliance

## Integration with Existing Features

- **Navigation**: Added to main navigation menu
- **Middleware**: Protected by authentication middleware
- **API Proxy**: Routes through Next.js API proxy to upstream backend
- **Styling**: Consistent with existing dashboard design system

## Testing the Feature

### Manual Testing Steps

1. **View Allowlist**
   ```bash
   # Navigate to /allowlist
   # Should display empty state or existing entries
   ```

2. **Add IP**
   ```bash
   # Click "Add IP" button
   # Fill in IP address (e.g., 192.168.1.100)
   # Add optional reason
   # Click "Add to Allowlist"
   # Verify entry appears in table
   ```

3. **Delete IP**
   ```bash
   # Click "Remove" on an entry
   # Confirm deletion in dialog
   # Verify entry is removed from table
   ```

### API Testing with cURL

```bash
# Get allowlist
curl -X GET http://localhost:3000/api/allowlist \
  -H "Cookie: auth_token=YOUR_TOKEN"

# Add IP to allowlist
curl -X POST http://localhost:3000/api/allowlist \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=YOUR_TOKEN" \
  -d '{"ip": "192.168.1.100", "reason": "Office network"}'

# Remove IP from allowlist
curl -X DELETE http://localhost:3000/api/allowlist/192.168.1.100 \
  -H "Cookie: auth_token=YOUR_TOKEN"
```

## Files Modified/Created

### New API Routes
- `src/app/api/allowlist/route.ts` - GET and POST handlers
- `src/app/api/allowlist/[ip]/route.ts` - DELETE handler

### New Pages
- `src/app/(dashboard)/allowlist/page.tsx` - Allowlist management UI

### Modified Files
- `src/components/Navigation.tsx` - Added Allowlist menu item

## Environment Variables
No additional environment variables required. Uses existing:
- `API_BASE` or `NEXT_PUBLIC_API_BASE` - Upstream API endpoint

## Future Enhancements

### Potential Features
- [ ] Bulk import/export of allowlist entries
- [ ] IP range support (CIDR notation)
- [ ] Expiration dates for temporary allowlist entries
- [ ] Search and filter functionality
- [ ] Pagination for large allowlists
- [ ] Activity log showing who added/removed IPs
- [ ] Integration with alerts to quick-allowlist IPs
- [ ] Comment/note system for each entry
- [ ] API key management for allowlisted IPs

### Performance Optimizations
- [ ] Client-side caching with SWR/React Query
- [ ] Optimistic UI updates
- [ ] Debounced search
- [ ] Virtual scrolling for large lists

## Support
For issues or questions, refer to the main project documentation or contact the development team.
