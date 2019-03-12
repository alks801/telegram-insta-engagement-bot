# instagram-engagement-bot :+1:

This bot should work in group chats.
The main functionality is mutual likes.

## UPD. Version 0.1 - March 2019
Now it's updated up to 0.1 version. 

As you can see now there are separated modules: bot-proxy, engagementManager, helpers and constants.


All code is really clearer and easier to understand (with comments ha-ha).
In index.js file all start with debug mode. Good luck and let's see you all in next versions! :)

Common Description. (Old, but more or less actual)
--------------------

We have group chat with people and bot;

Like time contains 3 parts (prepare, collecting, round):
1) **Prepare.** (20mins) 
Bot says: "Next round starts in 20 minutes, please get ready to submit your account name. Do not post your username until I’ve said to or else you’ll miss the round".
2) **Collecting.** (90mins) 
Bot says: "Comment your Instagram @accountname now to get added to the next engagement round".
People start write their @username from instagram.
Before 90 mins to end bot says: "90 minutes left to comment your Instagram @accountname for inclusion in this engagement round".
Before 30 mins to end bot says: "30 minutes left to comment your Instagram @accountname for inclusion in this engagement round".
Before 10 mins to end bot says: "10 minutes left to comment your Instagram @accountname for inclusion in this engagement round".

During the **Collecting** bot are collecting all @usernames.

3) **Round.** (60mins) 
Bot says: "The round starts now! Copy and paste the username lists into your Instagram Direct Messages, then click through each account and like and leave a 3+ word comment on the most recent post for each account".

And also it sends list of @usernames from Round.
All @username - link, that redirect directly to instagramm.


Bot will run 3 times in a day.

There are screens with work(On screens I didn't wait 90, 20 and 60 minutes :D) :

![fisrt](https://image.ibb.co/mfb4i6/11111.png)
![second](https://image.ibb.co/nNQYAm/44444.png)
