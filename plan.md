# Home Screen Functionality Implementation Plan

## Overview
This plan outlines the complete functionality implementation for the Home screen, including navigation flows, new screens, data persistence, and feature integration for the Releaf breathing app.

## Current State Analysis

**Files examined:**
- [src/screens/home/HomeScreen.tsx](src/screens/home/HomeScreen.tsx) - Current home screen with Start button, stats cards, techniques grid, daily tip, and PRO pill
- [src/hooks/home/useBreathingStats.ts](src/hooks/home/useBreathingStats.ts) - Current stats hook (totalMinutes, streakDays, todayMinutes)
- [src/hooks/home/useUserName.ts](src/hooks/home/useUserName.ts) - User name management
- [src/constants/breathing/TECHNIQUES.ts](src/constants/breathing/TECHNIQUES.ts) - Breathing techniques data

**Current limitations:**
- Start button has no functionality
- Technique cards have no click handlers
- Stats are static and not updated after sessions
- No technique detail screen exists
- No pricing/PRO screen exists
- No breathing session/timer screen exists
- No voice over or ambient sound integration

## Navigation Architecture

### Stack Navigator Setup
Create a new stack navigator for Home-related screens to handle the flow:

**File**: `src/navigation/HomeStackNavigator.tsx`
```
HomeStack:
  - HomeScreen (existing)
  - TechniqueDetailScreen (new)
  - BreathingSessionScreen (new)
  - PricingScreen (new)
```

### Navigation Flows

**Flow 1: Start Button**
```
HomeScreen → BreathingSessionScreen
  - Pass default technique (e.g., "4-7-8 Breathing" or user's last used)
  - Pass default duration (from settings or 10 minutes)
  - Start session immediately
```

**Flow 2: Technique Card Click**
```
HomeScreen → TechniqueDetailScreen → BreathingSessionScreen
  - Pass technique data to detail screen
  - Detail screen shows info, allows customization
  - User clicks "Start" to begin session
```

**Flow 3: PRO Pill Click**
```
HomeScreen → PricingScreen
  - Show pricing tiers
  - Allow in-app purchase
  - Return to home after purchase
```

## Screen Implementations

### 1. Technique Detail Screen

**File**: `src/screens/breathing/TechniqueDetailScreen.tsx`

**Purpose**: Show detailed information about a breathing technique before starting

**Components:**

**1.1 Header Section**
- Technique name (large, bold)
- Difficulty badge (Beginner/Intermediate/Advanced)
- Duration selector (5/10/15/20 min) - horizontal pills
- Back button (top left)

**1.2 Technique Info Card**
- Pattern visualization (e.g., "Inhale 4s → Hold 7s → Exhale 8s")
- Benefits list (3-4 bullet points)
- Best for: tags (e.g., "Sleep", "Stress Relief", "Focus")

**1.3 Instructions Section**
- Step-by-step guide
- Animated preview of breathing circle (small version)

**1.4 Settings Section**
- Voice guidance toggle (ON/OFF)
- Voice type selector (Female/Male) - only if voice is ON
- Ambient sound selector (None/Rain/Thunder/Ocean/Forest/Wind/Fire)
- Sound volume slider (if ambient sound is selected)

**1.5 Action Buttons**
- **Start Button** (primary, full width) → Navigate to BreathingSessionScreen
- **Save to Favorites** (secondary, icon button, top right) → Toggle favorite status

**Design specs:**
- Minimal design matching app aesthetic
- Teal accent color for selected states
- Clean sections with dividers
- ScrollView to accommodate all content
- Bottom padding to avoid tab bar overlap

### 2. Breathing Session Screen

**File**: `src/screens/breathing/BreathingSessionScreen.tsx`

**Purpose**: Main breathing exercise screen with timer and visual guidance

**Components:**

**2.1 Header Bar**
- Close button (X, top left) → Show exit confirmation alert
- Technique name (center, small text)
- Progress indicator (e.g., "5/10 min" or "50%" circle, top right)

**2.2 Breathing Circle Animation**
- Large animated circle (center of screen)
- Scales up for inhale, down for exhale, holds for pause
- Color transitions: teal when active, subtle gray when holding
- Smooth spring animations

**2.3 Phase Indicator**
- Text below circle showing current phase
- "Breathe In", "Hold", "Breathe Out", "Rest"
- Number countdown for each phase (e.g., "4" → "3" → "2" → "1")

**2.4 Control Bar (Bottom)**
- **Play/Pause button** (center, large)
- **Reset button** (left) → Restart session with confirmation
- **Settings button** (right) → Quick settings overlay (voice/sound toggles)

**2.5 Session Completion Modal**
- Appears when session completes
- Shows: "Great work!", session duration, technique name
- Stats update preview (e.g., "+10 minutes today")
- **Continue** button → Return to home
- **Repeat** button → Start same session again
- Confetti or subtle celebration animation

**Features:**

**2.6 Voice Over Integration**
- Use Text-to-Speech or pre-recorded audio
- Voice cues: "Breathe in", "Hold", "Breathe out"
- Gender selection (Female/Male voice)
- Can be toggled mid-session

**2.7 Ambient Sound Integration**
- Background sound loops (Rain, Thunder, Ocean, Forest, Wind, Fire)
- Volume control
- Fades in at session start, fades out at end
- Can be toggled mid-session

**2.8 Vibration Feedback**
- Haptic feedback at phase transitions (if enabled in settings)
- Light vibration on inhale start, exhale start

**2.9 Keep Screen Awake**
- Prevent screen lock during session
- Use `react-native-keep-awake` or similar

**2.10 Background Timer**
- Continue timer if app goes to background
- Show notification with current phase

### 3. Pricing Screen

**File**: `src/screens/pricing/PricingScreen.tsx`

**Purpose**: Display PRO subscription tiers and benefits

**Components:**

**3.1 Header**
- "Upgrade to PRO" title
- Close button (X, top right) → Return to home
- Subtitle: "Unlock your full potential"

**3.2 Benefits Section**
- List of PRO features with checkmarks:
  - ✓ All breathing techniques unlocked
  - ✓ Custom technique builder
  - ✓ Advanced analytics
  - ✓ Unlimited favorites
  - ✓ Export practice data
  - ✓ Ad-free experience
  - ✓ Premium ambient sounds
  - ✓ Priority support

**3.3 Pricing Tiers**
- **Monthly**: $4.99/month (pill card)
- **Yearly**: $29.99/year (pill card with "BEST VALUE" badge, save 50%)
- Tappable cards with selected state
- Clean minimal design with border

**3.4 Action Button**
- "Start Free Trial" or "Subscribe" (full width)
- Secondary text: "7-day free trial, cancel anytime"

**3.5 Legal**
- Small text: Terms of Service, Privacy Policy links
- Restore purchases button

**Design specs:**
- Centered layout
- Teal accent for selected tier
- Minimal card designs
- ScrollView for smaller screens

## Data Layer Enhancements

### 4. Enhanced Data Tracking

**4.1 New Storage Keys**

**File**: `src/constants/storage/STORAGE_KEYS.ts`
```typescript
export const STORAGE_KEYS = {
  // Existing
  userName: 'userName',
  totalMinutes: 'totalMinutes',
  streakDays: 'streakDays',
  todayMinutes: 'todayMinutes',
  lastPracticeDate: 'lastPracticeDate',

  // New additions
  practiceHistory: 'practiceHistory', // DailyPractice[]
  sessionHistory: 'sessionHistory', // SessionRecord[]
  techniqueStats: 'techniqueStats', // TechniqueStats[]
  favoriteTechniques: 'favoriteTechniques', // string[] (technique IDs)
  lastUsedTechnique: 'lastUsedTechnique', // string (technique ID)
  userSettings: 'userSettings', // UserSettings object
  proSubscription: 'proSubscription', // { active: boolean, expiresAt: number }
};
```

**4.2 Session Recording**

**File**: `src/utils/session/sessionManager.ts`

Functions:
- `startSession(techniqueId, duration, settings)` → Create session record
- `completeSession(sessionId)` → Mark complete, update stats
- `cancelSession(sessionId)` → Mark cancelled
- `updateStats(sessionData)` → Update all relevant stats:
  - Increment totalMinutes
  - Update todayMinutes
  - Update/maintain streak
  - Add to practiceHistory (daily aggregation)
  - Add to sessionHistory (individual record)
  - Update techniqueStats

**4.3 Stats Hook Enhancement**

**File**: `src/hooks/home/useBreathingStats.ts` (update existing)

Add functions:
- `refreshStats()` → Re-fetch stats from storage
- `recordSession(sessionData)` → Record completed session
- Auto-refresh when component mounts
- Return loading state

### 5. Settings Management

**5.1 User Settings Structure**

**File**: `src/types/Settings.ts`
```typescript
interface UserSettings {
  audio: {
    voiceGuidance: boolean;
    voiceType: 'female' | 'male';
    ambientSound: 'none' | 'rain' | 'thunder' | 'ocean' | 'forest' | 'wind' | 'fire';
    ambientVolume: number; // 0-100
    backgroundMusic: boolean;
  };
  practice: {
    vibrationFeedback: boolean;
    defaultDuration: 5 | 10 | 15 | 20;
    autoStart: boolean;
  };
  notifications: {
    dailyReminder: boolean;
    reminderTime: string; // HH:mm format
    streakReminders: boolean;
  };
  display: {
    showStatsDuringSession: boolean;
    animationSpeed: 'slow' | 'normal' | 'fast';
  };
}
```

**5.2 Settings Hook**

**File**: `src/hooks/settings/useUserSettings.ts`
```typescript
export const useUserSettings = () => {
  const [settings, setSettings] = useState<UserSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);

  // Load settings from storage
  // Update individual settings
  // Save settings to storage

  return { settings, updateSettings, loading };
};
```

## Component Implementations

### 6. Reusable Components

**6.1 Duration Selector**
**File**: `src/components/breathing/DurationSelector.tsx`
- Horizontal row of pills (5, 10, 15, 20 min)
- Selected state with teal background
- Tappable with activeOpacity

**6.2 Voice Selector**
**File**: `src/components/breathing/VoiceSelector.tsx`
- Two pills: Female / Male
- Selected state with teal background
- Only visible when voice guidance is enabled

**6.3 Ambient Sound Selector**
**File**: `src/components/breathing/AmbientSoundSelector.tsx`
- Horizontal ScrollView with sound options
- Cards with icon and label
- Selected state with teal border/background
- None option to disable

**6.4 Volume Slider**
**File**: `src/components/breathing/VolumeSlider.tsx`
- Slider from react-native-community/slider
- Min/max icons (speaker low/high)
- Teal track color

**6.5 Breathing Circle**
**File**: `src/components/breathing/BreathingCircle.tsx` (update existing)
- Enhance with Animated API
- Scale animation based on phase
- Color transitions
- Accept phase and duration props
- Smooth spring animations

**6.6 Phase Timer**
**File**: `src/components/breathing/PhaseTimer.tsx`
- Display current phase text
- Countdown number
- Animated transitions between phases

**6.7 Session Controls**
**File**: `src/components/breathing/SessionControls.tsx`
- Play/Pause button (toggles icon)
- Reset button with confirmation
- Settings button (opens overlay)

**6.8 Session Completion Modal**
**File**: `src/components/breathing/SessionCompletionModal.tsx`
- Modal overlay with card
- Session summary
- Action buttons
- Celebration animation (optional)

**6.9 Pricing Tier Card**
**File**: `src/components/pricing/PricingTierCard.tsx`
- Card with price, duration, features
- Selected state
- Badge for best value
- Tappable

## Audio Integration

### 7. Voice Over System

**File**: `src/services/audio/voiceService.ts`

**Approach**: Use `react-native-tts` (Text-to-Speech)

Functions:
- `initializeTTS()` → Setup TTS engine
- `setVoiceGender(gender: 'female' | 'male')` → Select voice
- `speak(text: string, language: string)` → Speak phrase
- `stop()` → Stop speaking
- `isSpeaking()` → Check if currently speaking

**Voice Cues:**
- "Breathe in" (at inhale start)
- "Hold" (at hold start)
- "Breathe out" (at exhale start)
- "Rest" (at rest start, if applicable)
- "Great work" (at session end)

**Timing:**
- Trigger voice cue 0.5s before phase starts
- Don't interrupt ongoing speech

### 8. Ambient Sound System

**File**: `src/services/audio/ambientSoundService.ts`

**Approach**: Use `react-native-sound` or `expo-av`

**Sound Files Required:**
- `rain.mp3` - Rain ambience loop
- `thunder.mp3` - Thunder storm loop
- `ocean.mp3` - Ocean waves loop
- `forest.mp3` - Forest birds loop
- `wind.mp3` - Wind ambience loop
- `fire.mp3` - Crackling fire loop

Functions:
- `loadSound(soundName: string)` → Load audio file
- `playSound(soundName: string, volume: number)` → Play looped
- `pauseSound()` → Pause playback
- `resumeSound()` → Resume playback
- `stopSound()` → Stop and reset
- `setVolume(volume: number)` → Adjust volume (0-1)
- `fadeIn(duration: number)` → Fade in over duration
- `fadeOut(duration: number)` → Fade out over duration

**Integration:**
- Load sound when detail screen mounts (if selected)
- Start playing with fadeIn when session begins
- Continue playing during entire session
- FadeOut when session ends or user exits

## Session Flow Implementation

### 9. Breathing Session Logic

**File**: `src/utils/breathing/breathingEngine.ts`

**Core Timer Logic:**

```typescript
interface BreathingPhase {
  name: 'inhale' | 'hold' | 'exhale' | 'rest';
  duration: number; // seconds
}

interface BreathingCycle {
  phases: BreathingPhase[];
}

class BreathingEngine {
  private currentPhase: number = 0;
  private currentPhaseTime: number = 0;
  private totalElapsedTime: number = 0;
  private sessionDuration: number; // minutes
  private cycle: BreathingCycle;
  private isPaused: boolean = false;

  // Start session with technique and duration
  start(techniqueId: string, duration: number)

  // Update every second
  tick()

  // Pause/resume
  pause()
  resume()

  // Reset to beginning
  reset()

  // Get current state
  getCurrentPhase(): BreathingPhase
  getCurrentPhaseTimeRemaining(): number
  getProgress(): number // 0-100
  isComplete(): boolean

  // Event callbacks
  onPhaseChange?: (phase: BreathingPhase) => void
  onSessionComplete?: () => void
}
```

**Usage in BreathingSessionScreen:**
1. Initialize engine on mount with technique and duration
2. Start interval (1000ms) that calls `tick()`
3. Listen to `onPhaseChange` to trigger:
   - Voice cues
   - Vibration
   - Circle animation
   - Phase text update
4. Listen to `onSessionComplete` to show completion modal
5. Handle play/pause/reset buttons

### 10. Animation System

**File**: `src/components/breathing/BreathingCircle.tsx` (enhancement)

**Animation specs:**

```typescript
// Circle size animation
const scaleValue = useRef(new Animated.Value(0.6)).current;

// Inhale: scale from 0.6 to 1.0
Animated.spring(scaleValue, {
  toValue: 1.0,
  duration: inhaleSeconds * 1000,
  useNativeDriver: true,
}).start();

// Exhale: scale from 1.0 to 0.6
Animated.spring(scaleValue, {
  toValue: 0.6,
  duration: exhaleSeconds * 1000,
  useNativeDriver: true,
}).start();

// Hold: maintain current scale
// (no animation, just hold the value)
```

**Color animation:**
- Inhale: teal (#50C9CE)
- Hold: light gray (#E5E5E5)
- Exhale: teal (#50C9CE)
- Smooth color transitions using Animated.timing

## Navigation Integration

### 11. Update App Navigator

**File**: `src/navigation/AppNavigator.tsx`

Add Home Stack Navigator:
```typescript
const HomeStack = createNativeStackNavigator();

function HomeStackNavigator() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="TechniqueDetail" component={TechniqueDetailScreen} />
      <HomeStack.Screen name="BreathingSession" component={BreathingSessionScreen} />
      <HomeStack.Screen name="Pricing" component={PricingScreen} />
    </HomeStack.Navigator>
  );
}
```

Update Bottom Tabs to use HomeStackNavigator instead of HomeScreen:
```typescript
<Tab.Screen name="HomeTab" component={HomeStackNavigator} />
```

### 12. Update Home Screen

**File**: `src/screens/home/HomeScreen.tsx` (add functionality)

**Changes:**

```typescript
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  const { stats, loading, refreshStats } = useBreathingStats();

  // Start button handler
  const handleStartPress = () => {
    // Navigate to breathing session with default/last used technique
    navigation.navigate('BreathingSession', {
      techniqueId: 'technique-1', // or lastUsedTechnique from storage
      duration: 10, // default or from settings
    });
  };

  // Technique card handler
  const handleTechniquePress = (technique) => {
    navigation.navigate('TechniqueDetail', {
      technique: technique,
    });
  };

  // PRO pill handler
  const handleProPress = () => {
    navigation.navigate('Pricing');
  };

  // Refresh stats when screen gains focus
  useFocusEffect(
    useCallback(() => {
      refreshStats();
    }, [])
  );

  return (
    // ... existing JSX with added onPress handlers
  );
};
```

## Testing & Verification

### 13. Verification Checklist

**Navigation Flow:**
- [ ] Start button navigates to BreathingSessionScreen
- [ ] Technique card navigates to TechniqueDetailScreen
- [ ] TechniqueDetail Start button navigates to BreathingSessionScreen
- [ ] PRO pill navigates to PricingScreen
- [ ] All back buttons work correctly
- [ ] Close button in BreathingSessionScreen shows confirmation alert

**Breathing Session:**
- [ ] Timer starts automatically
- [ ] Breathing circle animates correctly for each phase
- [ ] Phase text updates (Breathe In, Hold, Breathe Out)
- [ ] Phase countdown shows correct numbers
- [ ] Progress indicator updates
- [ ] Play/pause button works
- [ ] Reset button works with confirmation
- [ ] Session completes and shows modal
- [ ] Session data is saved correctly

**Audio:**
- [ ] Voice guidance plays at correct times
- [ ] Voice gender selection works
- [ ] Ambient sound plays and loops
- [ ] Ambient sound volume adjusts
- [ ] Audio can be toggled during session
- [ ] Audio stops when session ends

**Data Persistence:**
- [ ] Stats update after session completion
- [ ] Today's minutes increment correctly
- [ ] Total minutes increment correctly
- [ ] Streak updates correctly
- [ ] Session appears in history
- [ ] Technique stats update

**Settings Integration:**
- [ ] Default duration from settings applied
- [ ] Voice guidance setting respected
- [ ] Ambient sound setting respected
- [ ] Vibration setting respected
- [ ] Settings changes reflected in active session

## Implementation Order

### Phase 1: Navigation & Basic Screens (Day 1-2)
1. Create HomeStackNavigator
2. Update AppNavigator to use HomeStack
3. Create TechniqueDetailScreen skeleton
4. Create BreathingSessionScreen skeleton
5. Create PricingScreen
6. Add navigation handlers to HomeScreen

### Phase 2: Technique Detail Screen (Day 2-3)
1. Create DurationSelector component
2. Create VoiceSelector component
3. Create AmbientSoundSelector component
4. Create VolumeSlider component
5. Implement TechniqueDetailScreen layout
6. Add navigation to BreathingSession

### Phase 3: Breathing Engine (Day 3-4)
1. Create breathingEngine.ts with timer logic
2. Implement phase transitions
3. Add progress tracking
4. Test with console logs

### Phase 4: Breathing Session UI (Day 4-5)
1. Enhance BreathingCircle with animations
2. Create PhaseTimer component
3. Create SessionControls component
4. Implement BreathingSessionScreen layout
5. Integrate breathingEngine
6. Test animations and timer sync

### Phase 5: Audio Integration (Day 5-6)
1. Install react-native-tts
2. Create voiceService.ts
3. Integrate voice cues in BreathingSession
4. Install react-native-sound
5. Create ambientSoundService.ts
6. Add ambient sound files to assets
7. Integrate ambient sounds in BreathingSession

### Phase 6: Data Persistence (Day 6-7)
1. Update STORAGE_KEYS
2. Create sessionManager.ts
3. Enhance useBreathingStats hook
4. Implement session recording
5. Test stats updates after sessions

### Phase 7: Settings & Polish (Day 7-8)
1. Create useUserSettings hook
2. Integrate settings in TechniqueDetail
3. Apply settings in BreathingSession
4. Create SessionCompletionModal
5. Add exit confirmation alerts
6. Add celebration animations

### Phase 8: Testing & Refinement (Day 8-9)
1. Full flow testing
2. Edge case handling
3. Performance optimization
4. Bug fixes
5. UI/UX refinements

## Assets Required

### Audio Files
- `rain.mp3` - Loopable rain sound (2-3 minutes)
- `thunder.mp3` - Loopable thunder storm (2-3 minutes)
- `ocean.mp3` - Loopable ocean waves (2-3 minutes)
- `forest.mp3` - Loopable forest ambience (2-3 minutes)
- `wind.mp3` - Loopable wind sound (2-3 minutes)
- `fire.mp3` - Loopable crackling fire (2-3 minutes)

Place in: `assets/sounds/`

### Dependencies to Install
```bash
npm install @react-native-community/slider
npm install react-native-tts
npm install react-native-sound
npm install react-native-keep-awake
```

## Notes
- Keep minimal design aesthetic throughout all new screens
- Use DM Sans fonts consistently
- Maintain teal accent color (#50C9CE)
- No shadows, no gradients
- Clean borders (1.5px)
- Proper bottom padding to avoid tab bar overlap (100px)
- Add loading states where appropriate
- Handle edge cases (no internet, audio playback failures, etc.)
- Ensure smooth animations (60 FPS target)
- Test on both iOS and Android
