Now we simply need to commit that one file to main.

Run these three commands, one at a time:

git add data/hoops.json

then:

git commit -m "Update hoops JSON data"

and finally:

git status

The final status should say:

nothing to commit, working tree clean

And that's it. 🎯

That's actually a lovely little Git technique to have under your belt: bring one file across from a branch without merging the branch. ⚓️🐠