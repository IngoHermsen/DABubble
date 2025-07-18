import { AfterViewInit, Component, HostListener, inject, Input, OnInit } from '@angular/core';
import { Post } from '../core/interfaces/post';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import { EmojiComponent, EmojiEvent } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { ThreadService } from '../core/services/thread.service';
import { ViewService } from '../core/services/view.service';
import { FirestoreService } from '../core/services/firestore.service';
import { doc, DocumentReference, getDoc } from 'firebase/firestore';

// === Type Definitions ===

type Creator = {
  photoURL: string;
  username: string;
};


@Component({
  selector: 'app-post',
  standalone: true,
  imports: [PickerComponent, EmojiComponent],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent implements OnInit, AfterViewInit {
  dataLoaded: boolean = false;

  // === Dependency Injections ===
  public threadService = inject(ThreadService);
  public viewService = inject(ViewService);
  public firestoreService = inject(FirestoreService);

  // === Input / Output ===
  @Input() index: number;
  @Input() post: Post;

  creatorDocRef: DocumentReference;

  // === Local Data ===
  creator: Creator;
  creatorAvatarImgPath: string;


  showPostMenu: boolean;
  showEmojiMart: boolean;


  // === ViewModel ===
  isOdd: boolean;


  // === State Management ===
  userIdx: number | null = null;
  reactionIdx: number | null = null;


  // === Event Handlers ===
  @HostListener('mouseenter') onMouseEnter() {
    this.showPostMenu = true;
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.showPostMenu = false;
  }

  // === Lifecycle ===
  ngOnInit(): void {
    this.isOdd = this.index % 2 !== 0;
    this.showPostMenu = false;
    this.showEmojiMart = false;
    this.getcreator()
  }

  ngAfterViewInit() {
  }

  // === Methods ===

  /**
 * Asynchronously fetches the creator's data from Firestore using the post's creatorId.
 * If the document exists, it extracts the photoURL and username,
 * assigns them to creator, and sets the dataLoaded flag to true.
 */

  async getcreator() {
   this.creatorDocRef = doc(this.firestoreService.usersColRef, this.post.creatorId);
    await getDoc(this.creatorDocRef).then(docSnap => {
      if (docSnap.exists()) {
        const creatorObj: Creator = {
          photoURL: docSnap.data()['photoURL'],
          username: docSnap.data()['username']
        }
        this.creator = creatorObj;
        this.dataLoaded = true;
      } 
    });

  }

  /**
   * Handles the click on an emoji.
   * 
   * - Checks whether the emoji reaction already exists.
   * - If yes, toggles the user inside the existing reaction.
   * - If no, creates a new reaction with this emoji.
   * - Hides the emoji picker afterward.
   * 
   * @param event Emoji click event from emoji-mart.
   */
  handleEmojiClick(event: EmojiEvent) {
    const emoji = event.emoji;
    const emojiId = emoji.id;

    if (this.reactionExists(emojiId)) {
      const reaction = this.post.reactions[this.reactionIdx || 0];
      const reactingUsers = reaction.users;
      this.handleUser(reactingUsers);
    } else {
      this.addReaction(emojiId);
    }

    this.showEmojiMart = false;
  }


  /**
   * Handles a click on an existing reaction.
   * 
   * - Removes or adds the user depending on existence.
   * 
   * @param idx Index of the clicked reaction.
   */
  handleReactionClick(idx: number) {
    const reaction = this.post.reactions[idx];
    const reactingUsers: string[] = reaction.users;

    if (this.userExists(reactingUsers)) {
      this.removeUserFromReaction(reactingUsers, idx);
    } else {
      this.addUserToReaction(reactingUsers);
    }
  }


  /**
   * Adds the user to a reaction if not already present.
   * 
   * @param reactingUsers Array of user IDs reacting with the emoji.
   */
  handleUser(reactingUsers: string[]) {
    if (!this.userExists(reactingUsers)) {
      this.addUserToReaction(reactingUsers);
    }
  }


  /**
   * Checks whether the given emoji already exists in the post reactions.
   * 
   * @param emojiId The ID of the emoji to check.
   * @returns True if a reaction with the given emoji exists.
   */
  reactionExists(emojiId: string): boolean {
    const reactions = this.post.reactions;
    this.reactionIdx = reactions.findIndex(reaction => reaction.reactionId === emojiId);
    return this.reactionIdx > -1;
  }


  /**
   * Checks if the current user has already reacted.
   * 
   * @param reactingUsers The list of user IDs who reacted with an emoji.
   * @returns True if the current user exists in the list.
   */
  userExists(reactingUsers: string[]): boolean | number {
    this.userIdx = reactingUsers.indexOf(this.creator.username);
    return this.userIdx > -1;
  }


  /**
   * Removes the current user from the given reaction.
   * 
   * - If the reaction is now empty, it will be removed entirely.
   * 
   * @param reactingUsers List of user IDs in the reaction.
   * @param idx Index of the reaction in the array.
   */
  removeUserFromReaction(reactingUsers: string[], idx: number) {
    // Will be replaced by observable/signal once post data comes from Firebase
    if (this.userIdx !== null) {
      reactingUsers.splice(this.userIdx, 1);
    }

    this.handleReactionState(idx);
  }


  /**
   * Adds the current user to a given list of reacting users.
   * 
   * @param reactingUsers List of user IDs reacting with the emoji.
   */
  addUserToReaction(reactingUsers: string[]) {
    // Will be replaced by observable/signal once post data comes from Firebase
    reactingUsers.push(this.creator.username);
  }


  /**
   * Adds a new emoji reaction with the current user.
   * 
   * @param emojiId The ID of the emoji to add.
   */
  addReaction(emojiId: string) {
    const reactions = this.post.reactions;
    const reactionObj = {
      reactionId: emojiId,
      users: [this.creator.username]
    };

    reactions.push(reactionObj);
  }


  /**
   * Removes the entire reaction if it no longer contains any users.
   * 
   * @param idx Index of the reaction to check.
   */
  handleReactionState(idx: number) {
    if (this.post.reactions[idx].users.length === 0) {
      this.post.reactions.splice(idx, 1);
    }
  }


// === Navigation ===
/**
 * Opens the thread:
 * - caches thread data
 * - shows the thread section
 */
openThread() {
  this.setThreadData();
  this.showThreadSection();
}


// === Helper Methods ===
/**
 * Caches current post data in ThreadService.
 */
private setThreadData() {
  const tS = this.threadService;
  tS.setPostText(this.post.text);
  tS.setPostId(this.post.postId);
  tS.setCreatorImg(this.creator.photoURL);
  tS.setCreatorName(this.creator.username);
  tS.setTimeString(this.timeAsString);
}


/**
 * Sets the flag to display the thread section.
 */
private showThreadSection() {
  this.viewService.showThreadSection = true;
}


  // === Computed Properties ===
  /**
   * Returns the post creation time as a localized string.
   * 
   * - Format: "HH:MM Uhr" in German locale.
   */
  get timeAsString(): string {
    const creationTime: Date = this.post.creationTime.toDate();
    const timeAsString: String = creationTime.toLocaleTimeString('de-DE', {
      hour: '2-digit',
      minute: '2-digit'
    });
    return timeAsString + ' Uhr';
  }

}
